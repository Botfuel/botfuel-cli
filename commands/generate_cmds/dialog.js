var memFs = require('mem-fs');
var editor = require('mem-fs-editor');

var store = memFs.create();
var fs = editor.create(store);
const path = require('path');
const jsonFormat = require('json-format');
const chalk = require('chalk');
const { checkDialog } = require("../utils/verifications");

exports.command = 'dialog <name> [entities..]'
exports.aliases = ['d']
exports.desc = 'Generating dialog <name> of type [type] with [entities]'

exports.builder = {
  type: {
    description: "Dialog type (void, base, default, qna, confirmation)",
    requiresArg: true,
    required: false,
    default: 'default'
  }
}

exports.handler = function (argv) {
  console.log(`\t${chalk.green('create')}\tdialog ${argv.name} with entities(${argv.entities.join(' ')})`);

  if (!checkDialog(argv)) return;

  namespace = argv.name.toLowerCase();
  let [firstLetter, ...letters] = argv.name;
  const dialogName = `${firstLetter.toUpperCase()}${letters.join('')}`;

  let promptType = argv.type.toLowerCase();

  if (!['void', 'base', 'default', 'qna', 'confirmation'].includes(promptType)) {
    console.log(chalk.bgHex('#985f0d')(' WARNING ') + chalk.hex('#d58512')(` ${promptType} is not a valid type. Using Default instead.`));
    promptType = 'default';
  }

  [firstLetter, ...letters] = promptType;
  promptType = `${firstLetter.toUpperCase()}${letters.join('')}`;

  const entitiesJSON = {};
  const entityJsonConfig = {
    type: 'space',
    size: 2
  };
  if (argv.entities && argv.entities.length > 0) {
    for (let entity of argv.entities) {
      entity = entity.split(':');
      entitiesJSON[entity[0]] = { dim: entity[1] };
    }
  } 

  const location = path.join(__dirname, '/templates/dialog.js');
  fs.copyTpl(
    location,
    `src/dialogs/${argv.name}-dialog.js`,
    {
      dialogName: dialogName,
      namespace: namespace,
      entities: jsonFormat(entitiesJSON, entityJsonConfig),
      promptType: promptType
    }
  );

  fs.commit(() => {
    // TODO: Check commit errors
  });
}