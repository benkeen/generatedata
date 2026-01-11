/**
 * Precheck script ran on all root commands to ensure Docker is running and Node.js version is compatible.
 */
const { execSync } = require('child_process');
const semver = require('semver');
const packageJson = require('../package.json');

const separator = '-'.repeat(80);

const checkDocker = () => {
  try {
    execSync('docker info', { stdio: 'ignore' });
  } catch (err) {
    console.error(`${separator}\nError: Docker does not seem to be running. Please start Docker and try again.\n${separator}\n`);
    process.exit(1);
  }
};

const checkNodeVersion = () => {
  const requiredVersion = packageJson.engines.node;
  const currentVersion = process.version;

  if (!semver.satisfies(currentVersion, requiredVersion)) {
    console.error(
      `${separator}\nError: incompatible Node version. Required: ${requiredVersion}, Current: ${currentVersion}\nPlease ensure nvm is installed and run "nvm use" to get the correct version.\n${separator}\n`
    );
    process.exit(1);
  }
};

checkDocker();
checkNodeVersion();
