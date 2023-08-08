import {
  selectCommand,
  selectServer,
} from '#services/console.js'
import ServerConnect from '#services/ServerConnect.js'

async function main() {
  const serverData = await selectServer();
  const server = new ServerConnect(serverData.connectData);
  try {
    await server.connect();
    let command = await selectCommand(serverData.commands);
    await server.execute(command);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await server.disconnect();
  }
}
main();
