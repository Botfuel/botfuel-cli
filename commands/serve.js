const shell = require('shelljs');
const path = require('path');

const nodemon = require('nodemon');

exports.command = 'serve [config]'
exports.desc = 'Launch bot'
exports.builder = {
  dir: {
    default: '.'
  }
}
exports.handler = function (argv) {
  console.log('Starting bot');

  const environment = require(path.join(process.cwd(), '/environment')).environment;
  
  const BOTFUEL_APP_TOKEN = process.env.BOTFUEL_APP_TOKEN || environment.botfuel.appToken;
  const BOTFUEL_APP_ID = process.env.BOTFUEL_APP_ID || environment.botfuel.appId;
  const BOTFUEL_APP_KEY = process.env.BOTFUEL_APP_KEY || environment.botfuel.appKey;

  console.log(`BOTFUEL_APP_TOKEN : ${BOTFUEL_APP_TOKEN}`);
  console.log(`BOTFUEL_APP_ID : ${BOTFUEL_APP_ID}`);
  console.log(`BOTFUEL_APP_KEY : ${BOTFUEL_APP_KEY}`);

  command = `node_modules/botfuel-dialog/build/run.js`;
  const obj = {
    script: command,
    env: {
      "BOTFUEL_APP_TOKEN": BOTFUEL_APP_TOKEN,
      "BOTFUEL_APP_ID": BOTFUEL_APP_ID,
      "BOTFUEL_APP_KEY": BOTFUEL_APP_KEY
    },
    ext: 'js json'
  };
  if (argv.config) {
    obj.args = [`${argv.config}-config`];
  }
  
  console.log(`commant : ${command}`);

  nodemon(obj);
}