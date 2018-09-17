var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
const path = require('path');
const chalk = require('chalk');
const view = require('./view');
const fetch = require('node-fetch');
var store = memFs.create();
var fs = editor.create(store);
const { checkIntentName } = require('../utils/verifications');

const Confirm = require('prompt-confirm');

const { createView } = require('../utils/views');
const { createDialog } = require("../utils/dialogs");

const environment = require(path.join(process.cwd(), '/environment')).environment;

const BOTFUEL_APP_ID = process.env.BOTFUEL_APP_ID || environment.botfuel.appId;
const BOTFUEL_APP_KEY = process.env.BOTFUEL_APP_KEY || environment.botfuel.appKey;

exports.command = 'intent <name> [entities..]'
exports.desc = 'Generate intent <name>'
exports.builder = {
  type: {
    description: "Dialog/View type (prompt, void, base, default, qna, confirmation)",
    requiresArg: true,
    required: false,
    default: 'prompt'
  }
}
exports.builder = function (yargs) {
  // console.log(yargs);
  // yargs.demandCommand(view).argv;
}
exports.handler = function (argv) {

  console.log(`\t${chalk.green('create')}\tintent ${argv.name}`);
  if (!checkIntentName(argv, 'View')) return;

  const data = {
    "utterances": [],
    "label": argv.name,
    "description": "",
    "resolvePrompt": ""
  };


  // console.log(`BOTFUEL_APP_ID : ${BOTFUEL_APP_ID}`);
  // console.log(`BOTFUEL_APP_KEY : ${BOTFUEL_APP_KEY}`);

  if (!BOTFUEL_APP_ID || !BOTFUEL_APP_KEY) {

    const prompt = new Confirm('Your app environment variables are not set. Continue?');
    prompt.run()
      .then(function (answer) {
        console.log(answer);
        if (!answer) {
          return;
        } else {
          createDialog(argv);
          createView(argv);
        }
      });
  } else {
    createIntentApiCall(data);
    // createDialog(argv);
    // createView(argv);
  }
}

function createIntentApiCall(data) {
  
  console.log(`\t${chalk.green('create')}\tintent ${data.label} in trainer`);
  return fetch('https://api.botfuel.io/trainer/api/v0/intents',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Botfuel-Bot-Id': BOTFUEL_APP_ID,
        'App-Key': BOTFUEL_APP_KEY,
        'App-Id': BOTFUEL_APP_ID
      }
    })
    .then(response => {
      if (!response.ok) {
        throw {
          status: response.status
        };
      }
      return response.json()
    })
    .then(data => {
      //console.log(response)
    })
    .catch(error => {
      
      let errorMessage = '';
      if (error.status === 403) {
        errorMessage = `${chalk.hex('#c9302c')(`Permission denied`)}`;
      }

      console.log(`${chalk.bgHex('#ac2925')(' ERROR ')} ${chalk.hex('#c9302c')(`Can't create intent ${data.label} on trainer - ${errorMessage}`)}`);

    });
}