/**
 * Precheck script ran on all root commands to ensure Docker is running and Node.js version is compatible.
 */
const { execSync } = require('child_process');
const semver = require('semver');
const packageJson = require('../package.json');

const checkDocker = () => {
  try {
    execSync('docker info', { stdio: 'ignore' });
  } catch (err) {
    console.error('Error: Docker does not seem to be running. Please start Docker and try again.');
    process.exit(1);
  }
};

const checkNodeVersion = () => {
  const requiredVersion = packageJson.engines.node;
  const currentVersion = process.version;

  if (!semver.satisfies(currentVersion, requiredVersion)) {
    console.error(`Error: incompatible Node.js version. Required: ${requiredVersion}, Current: ${currentVersion}`);
    process.exit(1);
  }
};

checkDocker();
checkNodeVersion();
