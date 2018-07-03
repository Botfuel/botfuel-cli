exports.command = 'generate <command>'
exports.aliases = ['g']
exports.description = 'Generate cool stuff'
exports.builder = function (yargs) {
  return yargs.commandDir('generate_cmds')
}
exports.handler = function (argv) {}
