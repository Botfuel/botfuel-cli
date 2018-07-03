var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
const path = require('path');
const { checkView } = require('../utils/verifications');

var store = memFs.create();
var fs = editor.create(store);
const chalk = require('chalk');

exports.command = 'view <name>'
exports.aliases = ['v']
exports.desc = 'Generate view <name>'
exports.builder = {}
exports.handler = function (argv) {
  console.log(`\t${chalk.green('create')}\tview ${argv.name}`);
  
  if (!checkView(argv)) return;

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