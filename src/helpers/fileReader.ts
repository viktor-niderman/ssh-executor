import {readFileSync} from 'fs'
import appRoot from 'app-root-path';

const pathToSettingsFile: string = `${appRoot}/settings/servers.json`;
let serverSettingsJson: string;

export interface ConnectData {
  host: string;
  port: number;
  username: string;
  privateKey: string;
}

interface ServerEnvironment {
  connectData: ConnectData;
  commands: string[];
}

interface Server {
  [key: string]: ServerEnvironment;
}

interface ServerSettings {
  [key: string]: Server;
}

export const getServersSettings = (): ServerSettings => {
  if (!serverSettingsJson) {
    serverSettingsJson = readFileSync(pathToSettingsFile, 'utf8');
  }
  return JSON.parse(serverSettingsJson);
}
