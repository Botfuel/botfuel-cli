const Git = require("nodegit");
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');
const path = require('path');
const chalk = require('chalk');
const child_process = require('child_process');

const store = memFs.create();
const fs = editor.create(store);

exports.command = 'new <name>'
exports.aliases = ['n']
exports.desc = 'Create a new bot from starter'

exports.builder = {
  appToken: {
    description: "Botfuel App Token",
    requiresArg: true,
    required: false,
    default: ''
  },
  appId: {
    description: "Botfuel App Id",
    requiresArg: true,
    required: false,
    default: ''
  },
  appKey: {
    description: "Botfuel App Key",
    requiresArg: true,
    required: false,
    default: ''
  },
  'install-dependencies': {
    description: "Weather or not you want to install npm dependencies",
    requiresArg: true,
    required: false,
    default: true,
    type: 'boolean',
  }
}

exports.handler = function (argv) {

  const gitUrl    = "https://github.com/Botfuel/botfuel-sample-starter.git";
  const appToken  = argv.appToken   || "";
  const appId     = argv.appId      || "";
  const appKey    = argv.appKey     || "";

  console.log(`\t${chalk.green('create')}\tproject ${argv.name}`);
  return Git.Clone(gitUrl, `./${argv.name}`)
    .then(repo => {
      const location = path.join(__dirname, '/templates/environment.js');
      fs.copyTpl(
        location,
        `${argv.name}/environment.js`,
        {
          appToken: appToken,
          appId: appId,
          appKey: appKey
        }
      );
      return fs.commit(() => {
        // TODO: Handle errors
      });
    })
  .then(repo => {
    if (argv['install-dependencies']) {
      console.log(`\t${chalk.green('install')}\tnpm dependencies`);
      child_process.execSync(`cd ${argv.name} && npm install`, { stdio: 'ignore' });
    };
  });
}