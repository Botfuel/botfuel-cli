var memFs = require('mem-fs');
var editor = require('mem-fs-editor');

const view = require('./view');
var store = memFs.create();
var fs = editor.create(store);

exports.command = 'intent <name>'
exports.desc = 'Generate intent <name>'
exports.builder = function (yargs) {
  // console.log(yargs);
  yargs.demandCommand(view).argv;
}
exports.handler = function (argv) {
  
  console.log('Generting intent %s', argv.name);
}