# SSH Executor

# How to use
- Install
  - `npm i`
  - `sh create_settings.sh`
  - `cp ~/.ssh/id_rsa ./settings/ssh/id_rsa`
- Put info of your servers into `./settings/servers.json`
- Run `npm run start`

# How to use everywhere
- `nano ~/.zshrc`
- Add line `alias _ssh='node ${pathToProject}/dist/index.js'`
- `source ~/.zshrc`
- Use as `_ssh` everywhere
