import inquirer from 'inquirer';
import { getServerSettings } from './fileReader.js'

async function simpleQuestion(question, listOfAnswers) {
  return (await inquirer.prompt([
    {
      type: 'list',
      name: 'answer',
      message: question,
      choices: listOfAnswers
    }
  ])).answer;
}
export const selectServer = async () => {
  let settings = getServerSettings();

  const server = Object.keys(settings).length > 1 ? await simpleQuestion(
    'Select the server you want to connect to',
    Object.keys(settings)
  ) : Object.keys(settings)[0];

  const environment = Object.keys(settings[server]).length > 1 ? await simpleQuestion(
    'Select the environment',
    Object.keys(settings[server])
  ) : Object.keys(settings[server])[0];

  console.log(`You selected: ${server} | ${environment}`)
  return settings[server][environment];
}
