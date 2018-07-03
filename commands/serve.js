const shell = require('shelljs');
const path = require('path');


exports.command = 'serve [config]'
exports.desc = 'Launch bot'
exports.builder = {
  dir: {
    default: '.'
  }
}
exports.handler = function (argv) {
  console.log('Starting bot');
  // const BOTFUEL_APP_TOKEN = "1409617742089";
  // const BOTFUEL_APP_ID = "d42ec1b6";
  // const BOTFUEL_APP_KEY = "23528e15ba16a36906c7e465c1912a05";

  // import environment from './environment.js';
  
  // console.log(path.join(process.cwd()));
  // const env = path.join(process.cwd(), '/environment');
  // console.log(env);
  // const environment = require(env);
  // return;
  const environment = require(path.join(process.cwd(), '/environment')).environment;
  
  const BOTFUEL_APP_TOKEN = process.env.BOTFUEL_APP_TOKEN || environment.botfuel.appToken;
  const BOTFUEL_APP_ID = process.env.BOTFUEL_APP_ID || environment.botfuel.appId;
  const BOTFUEL_APP_KEY = process.env.BOTFUEL_APP_KEY || environment.botfuel.appKey;

  console.log(`BOTFUEL_APP_TOKEN : ${BOTFUEL_APP_TOKEN}`);
  console.log(`BOTFUEL_APP_ID : ${BOTFUEL_APP_ID}`);
  console.log(`BOTFUEL_APP_KEY : ${BOTFUEL_APP_KEY}`);
  return;
  let command = `BOTFUEL_APP_TOKEN=${BOTFUEL_APP_TOKEN} BOTFUEL_APP_ID=${BOTFUEL_APP_ID} BOTFUEL_APP_KEY=${BOTFUEL_APP_KEY}`;
  
  command = `${command} npm start`;
  if (argv.config) {
    command = `${command} ${argv.config}-config`;
  }
  
  console.log(`commant : ${command}`);
  shell.exec(command);
  // if (shell.exec(command).code !== 0) {
  //   shell.echo('Error');
  //   shell.exit(1);
  // }
}