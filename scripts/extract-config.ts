/**
 * This script reads the TypeScript config files and extracts the values needed
 * by docker-compose.prod.yml, writing them to a .env.prod file.
 *
 * Usage: tsx scripts/extract-config.ts
 */
import * as fs from 'fs';
import * as path from 'path';

// Import the config files
import serverConfig from '../packages/config/src/server.config';
import clientConfig from '../packages/config/src/client.config';

const envFilePath = path.join(__dirname, '..', '.env.prod');

// Extract all values that Docker Compose needs
const envVars = {
  // Database config for MariaDB container
  MYSQL_ROOT_PASSWORD: serverConfig.database.GD_MYSQL_ROOT_PASSWORD,
  MYSQL_DATABASE: serverConfig.database.GD_DB_NAME,
  MYSQL_USER: serverConfig.database.GD_MYSQL_ROOT_USER,
  GD_DB_PORT: serverConfig.database.GD_DB_PORT,

  // Server (GraphQL) port
  GD_API_SERVER_PORT: clientConfig.api.GD_API_SERVER_PORT,

  // Client (nginx) port
  GD_WEB_SERVER_PORT: clientConfig.webServer.GD_WEB_SERVER_PORT
};

// Generate .env file content
const envContent = Object.entries(envVars)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

// Write to .env.prod
fs.writeFileSync(envFilePath, envContent + '\n', 'utf8');

console.log('✅ Generated .env.prod from config files');
console.log(`   Database: ${envVars.MYSQL_DATABASE} (port ${envVars.GD_DB_PORT})`);
console.log(`   GraphQL Server: port ${envVars.GD_API_SERVER_PORT}`);
console.log(`   Web Server: port ${envVars.GD_WEB_SERVER_PORT}`);
