var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
const path = require('path');

var store = memFs.create();
var fs = editor.create(store);
const chalk = require('chalk');

function createView(argv) {
  console.log(`\t${chalk.green('create')}\tview ${argv.name}`);
  
  let [firstLetter, ...letters] = argv.name;
  const viewName = `${firstLetter.toUpperCase()}${letters.join('')}`;
  
  let viewType = (argv.type || ' ').toLowerCase();

  if (!['prompt', 'default', 'confirmation', 'disambiguation', ' '].includes(viewType)) {
    console.log(chalk.bgHex('#985f0d')(' WARNING ') + chalk.hex('#d58512')(` ${viewType} is not a valid type. Using Default instead.`));
    viewType = 'base';
  }

  [firstLetter, ...letters] = viewType;
  viewType = `${firstLetter.toUpperCase()}${letters.join('')}`;

  const location = path.join(__dirname, '../generate_cmds/templates/view.js');
  fs.copyTpl(
    location,
    `src/views/${argv.name}-view.js`,
    {
      viewName: viewName,
      viewType: viewType
    });
  fs.commit(() => {
    // console.log("View created");
  });
}

module.exports.createView = createView;