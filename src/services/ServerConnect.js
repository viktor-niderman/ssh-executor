import { NodeSSH } from 'node-ssh'
import chalk from 'chalk'

export default class ServerConnect {
  constructor(connectData) {
    this.connectData = connectData;
    this.conn = new NodeSSH();
  }

  async connect() {
    await this.conn.connect(this.connectData);
  }

  async #executeCommand(command) {
    this.conn.execCommand(command).then(function(result) {
      if (result.stdout) {
        console.log('Server answer:\n' + chalk.white.bgBlack(result.stdout));
      }
      if (result.stderr) {
        console.log('Server error:\n' + chalk.red.bgWhite(result.stderr));
      }
    })
  }

  async execute(command) {
    await this.#executeCommand(command);
  }
}
