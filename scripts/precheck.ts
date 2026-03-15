/**
 * Precheck script ran on all root commands to ensure Docker is running and Node.js version is compatible.
 */
import { execSync } from 'child_process';
import semver from 'semver';
import packageJson from '../package.json';
import serverConfig from '../packages/config/src/server.config';
import clientConfig from '../packages/config/src/client.config';

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

const checkForConflictingDbContainer = () => {
  const dbPort = serverConfig.database.GD_DB_PORT;
  try {
    const result = execSync(`docker ps --filter publish=${dbPort} --format "{{.Names}}"`, { encoding: 'utf8' }).trim();
    if (result) {
      const runningNames = result.split('\n').map((n) => n.trim());
      // If the only container on this port is the project's own db container, it's safe to reuse it
      if (runningNames.length === 1 && runningNames[0] === 'db') {
        return;
      }
      const names = runningNames.join(', ');
      console.error(
        `${separator}\nError: A Docker container is already running with port ${dbPort} bound: ${names}\nThis will conflict with the dev database container and cause InnoDB lock errors.\nStop the conflicting container first, e.g.:\n  docker stop ${runningNames[0]}\n${separator}\n`
      );
      process.exit(1);
    }
  } catch (err) {
    // If the docker command fails for any reason, skip this check
  }
};

const checkEmailConfig = () => {
  const appType = clientConfig.appSettings.GD_APP_TYPE;
  const emailRequiredTypes = ['login', 'open', 'closed'];

  if (!emailRequiredTypes.includes(appType)) {
    return;
  }

  const { email } = serverConfig;
  const missing = (
    [
      ['GD_EMAIL_OAUTH_SERVICE_CLIENT_ID', email?.GD_EMAIL_OAUTH_SERVICE_CLIENT_ID],
      ['GD_EMAIL_OAUTH_PRIVATE_KEY', email?.GD_EMAIL_OAUTH_PRIVATE_KEY],
      ['GD_EMAIL_SENDER_EMAIL', email?.GD_EMAIL_SENDER_EMAIL],
      ['GD_EMAIL_SENDER_NAME', email?.GD_EMAIL_SENDER_NAME]
    ] as [string, string | undefined][]
  )
    .filter(([, value]) => !value)
    .map(([key]) => `  - ${key}`);

  if (missing.length > 0) {
    console.error(
      `${separator}\nError: GD_APP_TYPE is set to "${appType}", which requires email settings to be configured in packages/config/src/server.config.ts.\nThe following fields are missing or empty:\n${missing.join('\n')}\n${separator}\n`
    );
    process.exit(1);
  }
};

checkDocker();
checkNodeVersion();
checkForConflictingDbContainer();
checkEmailConfig();
