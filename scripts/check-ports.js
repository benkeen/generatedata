/**
 * Checks if required ports are available before starting production containers.
 * Gives clear error messages if ports are in use.
 *
 * Reads port configuration from packages/config
 */
const net = require('net');
const { clientConfig, serverConfig } = require('@generatedata/config');

const PORTS_TO_CHECK = [
  { port: serverConfig.database.GD_DB_PORT, name: 'Database (MariaDB)' },
  { port: clientConfig.api.GD_API_SERVER_PORT, name: 'GraphQL Server' },
  { port: clientConfig.webServer.GD_WEB_SERVER_PORT, name: 'Web Server (nginx)' }
];

function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve({ port, inUse: true });
      } else {
        resolve({ port, inUse: false });
      }
    });

    server.once('listening', () => {
      server.close();
      resolve({ port, inUse: false });
    });

    server.listen(port, '0.0.0.0');
  });
}

async function main() {
  console.log('\n🔍 Checking if required ports are available...\n');

  const results = await Promise.all(PORTS_TO_CHECK.map(({ port }) => checkPort(port)));

  const portsInUse = results
    .filter((r) => r.inUse)
    .map((r) => {
      const portInfo = PORTS_TO_CHECK.find((p) => p.port === r.port);
      return { ...r, name: portInfo.name };
    });

  if (portsInUse.length > 0) {
    console.log('❌ The following ports are already in use:\n');

    portsInUse.forEach(({ port, name }) => {
      console.log(`   • Port ${port} (${name})`);
    });

    console.log('\n📋 This usually means the dev server is still running.');
    console.log('\n   To stop the dev server, run:');
    console.log('   ┌──────────────────────────────────────────────────────────┐');
    console.log('   │  docker compose -f apps/server/docker-compose.yml down   │');
    console.log('   └──────────────────────────────────────────────────────────┘');
    console.log('\n   Then try running `pnpm run prod` again.\n');

    process.exit(1);
  }

  console.log('✅ All required ports are available.\n');
}

main();
