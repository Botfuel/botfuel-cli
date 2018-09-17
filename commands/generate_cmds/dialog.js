const { checkIntentName } = require("../utils/verifications");
const { createDialog } = require("../utils/dialogs");

exports.command = 'dialog <name> [entities..]'
exports.aliases = ['d']
exports.desc = 'Generating dialog <name> of type [type] with [entities]'

exports.builder = {
  type: {
    description: "Dialog type (prompt, void, base, default, qna, confirmation)",
    requiresArg: true,
    required: false,
    default: 'base'
  }
}

exports.handler = function (argv) {
  
  if (!checkIntentName(argv, 'Dialog')) return;
  createDialog(argv);
}