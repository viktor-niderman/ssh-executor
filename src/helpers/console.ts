import inquirer from 'inquirer';

export const simpleQuestion = async (question:string, listOfAnswers:Array<string>) => {
  if (listOfAnswers.length === 1) {
    return listOfAnswers[0];
  }
  return (await inquirer.prompt([
    {
      type: 'list',
      name: 'answer',
      message: question,
      choices: listOfAnswers
    }
  ])).answer;
}
export const promptQuestion = async (question:string) => {
  return (await inquirer.prompt([
    {
      type: 'input',
      name: 'answer',
      message: question,
    }
  ])).answer;
}

export const selectCommand = async (commandsList:Array<string>) => {
  let suggest = 'Enter your own command';
  let command = await simpleQuestion("Select Command",
    [...commandsList, suggest]
  );
  if (command === suggest) {
    command = await promptQuestion('Your command: ');
  }
  return command;
}
