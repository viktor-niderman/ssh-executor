import { Client } from 'ssh2'
import { readFileSync } from 'fs'

export const connectToServer = (connectData) => {
  connectData.privateKey = readFileSync(connectData.privateKey)
  const conn = new Client();
  conn.on('ready', () => {
    console.log('Client :: ready');
    conn.exec('uptime', (err, stream) => {
      if (err) throw err;
      stream.on('close', (code, signal) => {
        console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
        conn.end();
      }).on('data', (data) => {
        console.log('STDOUT: ' + data);
      }).stderr.on('data', (data) => {
        console.log('STDERR: ' + data);
      });
    });
  }).connect(connectData);
}


