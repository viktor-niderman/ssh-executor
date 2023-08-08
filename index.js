import { selectServer } from './src/services/console.js'
import { connectToServer } from './src/services/ssh.js'

selectServer().then(serverData => {
  connectToServer(serverData.connectData)
})
