const chalk = require('chalk');
var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
const path = require('path');
const jsonFormat = require('json-format');

var store = memFs.create();
var fs = editor.create(store);

function createDialog(argv) {
  console.log(`\t${chalk.green('create')}\tdialog ${argv.name} with entities(${argv.entities.join(' ')})`);

  namespace = argv.name.toLowerCase();
  let [firstLetter, ...letters] = argv.name;
  const dialogName = `${firstLetter.toUpperCase()}${letters.join('')}`;

  let promptType = (argv.type || 'base').toLowerCase();

  if (!['prompt', 'void', 'base', 'default', 'qna', 'confirmation', 'disambiguation'].includes(promptType)) {
    console.log(chalk.bgHex('#985f0d')(' WARNING ') + chalk.hex('#d58512')(` ${promptType} is not a valid type. Using Default instead.`));
    promptType = 'base';
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

  const location = path.join(__dirname, '../generate_cmds/templates/dialog.js');
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

module.exports.createDialog = createDialog;