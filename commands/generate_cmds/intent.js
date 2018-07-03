var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
const path = require('path');

const view = require('./view');
const fetch = require('node-fetch');
var store = memFs.create();
var fs = editor.create(store);

exports.command = 'intent <name>'
exports.desc = 'Generate intent <name>'
exports.builder = function (yargs) {
  // console.log(yargs);
  // yargs.demandCommand(view).argv;
}
exports.handler = function (argv) {

  console.log('Generting intent %s', argv.name);
  const data = {
    "utterances": [],
    "label": argv.name,
    "description": "",
    "resolvePrompt": ""
  };

  const environment = require(path.join(process.cwd(), '/environment')).environment;
  
  const BOTFUEL_APP_ID = process.env.BOTFUEL_APP_ID || environment.botfuel.appId;
  const BOTFUEL_APP_KEY = process.env.BOTFUEL_APP_KEY || environment.botfuel.appKey;
  
  console.log(`BOTFUEL_APP_ID : ${BOTFUEL_APP_ID}`);
  console.log(`BOTFUEL_APP_KEY : ${BOTFUEL_APP_KEY}`);

  fetch('https://api.botfuel.io/trainer/api/v0/intents',
    {
      method: 'POST',
      body:    JSON.stringify(data),
      headers: { 
        'Content-Type': 'application/json',
        'Botfuel-Bot-Id': BOTFUEL_APP_ID,
        'App-Key': BOTFUEL_APP_KEY,
        'App-Id': BOTFUEL_APP_ID
      }
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(error => console.log(error));
}