const _ = require('underscore');
const fs = require('fs');
const xml2js = require('xml2js');

const levelName = 'level-one';

const parser = new xml2js.Parser();
fs.readFile(`../resources/${levelName}.svg`, function(err, data) {
  parser.parseString(data, function (err, result) {
    const level = extractLevel(result);
    const json = 'export default ' + JSON.stringify(level);
    fs.writeFile(`../src/data/levels/${levelName}.js`, json, () => console.log(`Finished with ${levelName}`));
  });
});

function findPoints(data, searchId, origin = { x: 0, y: 0 }) {
  const points = _.filter(data.svg.g[0].g, ({ $: { id } }) => id === searchId)[0].circle;
  return points.map(({ $: { cx, cy } }) => ({ x: parseFloat(cx) - origin.x, y: parseFloat(cy) - origin.y }));
}

function findPaths(data, searchId, origin) {
  const paths = _.filter(data.svg.g[0].g, ({ $: { id } }) => id === searchId)[0].path;
  return paths.map(({ $: { d } }) => parsePath(d, origin));
}

function parsePath(data, origin) {
  return data.split('C').map((pointData) => parsePoint(pointData, origin));
}

function parsePoint(data, origin) {
  const matcher = data[0] === 'M' ? /M(.*),(.*)/ : / (.*),(.*) /;
  const match = data.match(matcher);

  return { x: parseFloat(match[1]) - origin.x, y: parseFloat(match[2]) - origin.y };
}

function extractLevel(data) {
  const origin = findPoints(data, 'Origin')[0];
  const sites = findPoints(data, 'Sites', origin);
  const paths = findPaths(data, 'Paths', origin);

  return { sites, paths };
}