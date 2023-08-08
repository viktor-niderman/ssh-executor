import { readFileSync } from 'fs'

const pathToSettingsFile = 'settings/servers.json';
let serverSettings;

export const getServerSettings = () => {
  if (!serverSettings) {
    serverSettings = readFileSync(pathToSettingsFile);
  }
  return JSON.parse(serverSettings);
}
