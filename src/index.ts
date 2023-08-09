import ServerConnect from './services/ServerConnect.js'
import {getServersSettings} from "./helpers/fileReader.js";
import {selectCommand, simpleQuestion} from "./helpers/console.js";
import chalk from "chalk";

async function main() {
    const serversSettings = getServersSettings();
    console.log(serversSettings);
    const serverName:string = await simpleQuestion(
        'Select the server you want to connect to',
        Object.keys(serversSettings)
    );

    const environmentName:string = await simpleQuestion(
        'Select the environment',
        Object.keys(serversSettings[serverName])
    );

    console.log(chalk.green.bold(`You selected: ${serverName} | ${environmentName}`))
    const serverData = serversSettings[serverName][environmentName];
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
