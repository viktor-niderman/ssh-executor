import { Client } from 'ssh2'
import { readFileSync } from 'fs'
import chalk from 'chalk'
import appRoot from 'app-root-path';
import {ConnectData} from "../helpers/fileReader";
export default class ServerConnect {
    private connectData: ConnectData;
    private conn: any;
  constructor(connectData:ConnectData) {

    this.connectData = connectData;
    this.conn = new Client();
  }

  async connect() {
    return new Promise<void>((resolve, reject) => {
      this.conn.on('ready', () => {
        console.log('SSH connection established');
        resolve();
      }).on('error', (err: any) => {
        reject(err);
      }).connect({
          host: this.connectData.host,
          port: this.connectData.port,
          username: this.connectData.username,
          privateKey: readFileSync(`${appRoot}/${this.connectData.privateKey}`)
      });
    });
  }

  async #executeCommand(command: string) {
    return new Promise((resolve, reject) => {
      this.conn.exec(command, (err: any, stream: any) => {
        if (err) {
          reject(err);
          return;
        }
        let stdout = '';
        let stderr = '';

        stream.on('close', (code: any, signal: any) => {
          resolve({ stdout, stderr });
        }).on('data', (data: any) => {
          stdout += data;
        }).stderr.on('data', (data: any) => {
          stderr += data;
        });
      });
    });
  }

  async execute(command: string) {
    const result :any = await this.#executeCommand(command);
    if (result.stdout) {
      console.log('Server answer:\n' + chalk.white.bgBlack(result.stdout));
    }
    if (result.stderr) {
      console.log('Server error:\n' + chalk.red.bgWhite(result.stderr));
    }
  }

  async disconnect() {
    this.conn.end();
  }
}
