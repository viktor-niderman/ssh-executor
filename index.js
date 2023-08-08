import { selectServer, simpleQuestion } from './src/services/console.js'
import ServerConnect from './src/classes/ServerConnect.js'

async function main() {
  const serverData = await selectServer();
  const server = new ServerConnect(serverData.connectData);
  try {
    await server.connect();
    const command = await simpleQuestion("Select Command", serverData.commands)

    await server.execute(command);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await server.disconnect();
  }
}
main();
