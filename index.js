import { selectServer } from './src/services/console.js'
import ServerConnect from './src/classes/ServerConnect.js'

async function main() {
  const serverData = await selectServer();
  const server = new ServerConnect(serverData.connectData);
  try {
    await server.connect();
    await server.execute('cd /var/www/ && ls');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await server.disconnect();
  }
}
main();
