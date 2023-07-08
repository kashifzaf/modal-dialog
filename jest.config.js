const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: getJestProjects(),
  collectCoverage: true,
  coverageReporters: ["json", "html", "text"],
  collectCoverageFrom: ["!**/node_modules/**"],
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};