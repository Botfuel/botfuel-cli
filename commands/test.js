const shell = require('shelljs');
const path = require('path');


exports.command = 'test'
exports.desc = 'Run tests'
exports.builder = {
  dir: {
    default: '.'
  }
}
exports.handler = function (argv) {
  console.log('Running tests');

  const environment = require(path.join(process.cwd(), '/environment')).environment;
  
  const BOTFUEL_APP_TOKEN = process.env.BOTFUEL_APP_TOKEN || environment.botfuel.appToken;
  const BOTFUEL_APP_ID = process.env.BOTFUEL_APP_ID || environment.botfuel.appId;
  const BOTFUEL_APP_KEY = process.env.BOTFUEL_APP_KEY || environment.botfuel.appKey;
  
  let command = `BOTFUEL_APP_TOKEN=${BOTFUEL_APP_TOKEN} BOTFUEL_APP_ID=${BOTFUEL_APP_ID} BOTFUEL_APP_KEY=${BOTFUEL_APP_KEY}`;
  
  command = `${command} npm run test`;
  
  console.log(`commant : ${command}`);
  shell.exec(command);
  // if (shell.exec(command).code !== 0) {
  //   shell.echo('Error');
  //   shell.exit(1);
  // }
}