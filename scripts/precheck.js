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

const getDbPort = () => {
  try {
    const fs = require('fs');
    const path = require('path');
    const configPath = path.join(__dirname, '../packages/config/src/server.config.ts');
    const contents = fs.readFileSync(configPath, 'utf8');
    const match = contents.match(/GD_DB_PORT\s*:\s*(\d+)/);
    return match ? match[1] : '3306';
  } catch (err) {
    return '3306';
  }
};

const checkForConflictingDbContainer = () => {
  const dbPort = getDbPort();
  try {
    const result = execSync(`docker ps --filter publish=${dbPort} --format "{{.Names}}"`, { encoding: 'utf8' }).trim();
    if (result) {
      const names = result.split('\n').join(', ');
      console.error(
        `${separator}\nError: A Docker container is already running with port ${dbPort} bound: ${names}\nThis will conflict with the dev database container and cause InnoDB lock errors.\nStop the conflicting container first, e.g.:\n  docker stop ${result.split('\n')[0]}\n${separator}\n`
      );
      process.exit(1);
    }
  } catch (err) {
    // If the docker command fails for any reason, skip this check
  }
};

checkDocker();
checkNodeVersion();
checkForConflictingDbContainer();
