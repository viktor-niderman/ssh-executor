import { Client } from 'ssh2'
import { readFileSync } from 'fs'

export default class ServerConnect {
  constructor(connectData) {
    connectData.privateKey = readFileSync(connectData.privateKey)
    this.connectData = connectData;
    this.conn = new Client();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.conn.on('ready', () => {
        console.log('SSH connection established');
        resolve();
      }).on('error', (err) => {
        reject(err);
      }).connect(this.connectData);
    });
  }

  async executeCommand(command) {
    return new Promise((resolve, reject) => {
      this.conn.exec(command, (err, stream) => {
        if (err) {
          reject(err);
          return;
        }
        let stdout = '';
        let stderr = '';

        stream.on('close', (code, signal) => {
          resolve({ stdout, stderr });
        }).on('data', (data) => {
          stdout += data;
        }).stderr.on('data', (data) => {
          stderr += data;
        });
      });
    });
  }

  async execute(command) {
    const result = await this.executeCommand(command);
    if (result.stdout) {
      console.log(result.stdout);
    }
    if (result.stderr) {
      console.log('STDERR:', result.stderr);
    }
  }

  async disconnect() {
    this.conn.end();
  }
}
