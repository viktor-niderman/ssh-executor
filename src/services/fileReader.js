import { readFileSync } from 'fs'
import appRoot from 'app-root-path';

const pathToSettingsFile = `${appRoot}/settings/servers.json`;
let serverSettings;

export const getServerSettings = () => {
  if (!serverSettings) {
    serverSettings = readFileSync(pathToSettingsFile);
  }
  return JSON.parse(serverSettings);
}
