const nxPreset = require('@nrwl/jest/preset');
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  ...nxPreset,
  ...tsjPreset,
};
