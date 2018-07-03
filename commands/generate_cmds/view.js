var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
const path = require('path');

var store = memFs.create();
var fs = editor.create(store);
const chalk = require('chalk');

exports.command = 'view <name>'
exports.aliases = ['v']
exports.desc = 'Generate view <name>'
exports.builder = {}
exports.handler = function (argv) {
  console.log(`\t${chalk.green('create')}\tview ${argv.name}`);
  const name_validation = /^[a-z0-9]+[a-z0-9-]*[a-z0-9]+$/;
  if (!name_validation.test(argv.name)) {
    console.log(`${chalk.bgHex('#ac2925')(' ERROR ')} ${chalk.hex('#c9302c')('View name must contain only lowercase letters, numbers, hyphens, without spaces. It cannot begin or end with a hyphen.')}`);
    return;
  }
  if (name_validation.length > 200) {
    console.log(`${chalk.bgHex('#ac2925')(' ERROR ')} ${chalk.hex('#c9302c')('View name must be no longer than 200 characters.')}`);
    return;
  }

  const [firstLetter, ...letters] = argv.name;
  const viewName = `${firstLetter.toUpperCase()}${letters.join('')}`;
  
  const location = path.join(__dirname, '/templates/view.js');
  fs.copyTpl(
    location,
    `src/views/${argv.name}-view.js`,
    {
      viewName: viewName
    });
  fs.commit(() => {
    // console.log("View created");
  });
}