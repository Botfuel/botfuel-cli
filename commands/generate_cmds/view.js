const { checkIntentName } = require('../utils/verifications');
const { createView } = require('../utils/views');

exports.command = 'view <name>'
exports.aliases = ['v']
exports.desc = 'Generate view <name>'
exports.builder = {}
exports.handler = function (argv) {
  
  if (!checkIntentName(argv, 'View')) return;

  createView(argv);
}