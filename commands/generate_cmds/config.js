var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
const path = require('path');

var store = memFs.create();
var fs = editor.create(store);
const jsonFormat = require('json-format');

exports.command = 'config <name> [options]'
exports.aliases = ['c']
exports.desc = 'Generate config <name>'
exports.builder = {
  adapter: {
    description: "Adapter to use (test, botfuel, shell, messenger ...)",
    requiresArg: true,
    required: false,
    default: 'shell'
  },
  brain: {
    description: "Brain to use (memory, mongo)",
    requiresArg: true,
    required: false
  },
  locale: {
    description: "Locale to use (en, fr, en)",
    requiresArg: true,
    required: false
  },
  logger: {
    description: "Logger to use (debug, info, error)",
    requiresArg: true,
    required: false
  },
  modules: {
    description: "List of modules used (botfuel-module-facetedsearch, ...)",
    requiresArg: true,
    required: false
  }
}
exports.example = 'fuel g config botfuel --adapter=botfuel --brain=memory --locale=en --logger=info --modules="botfuel-module-facetedsearch"'
exports.handler = function (argv) {
  console.log('Generting config %s', argv.name);
  const config = {};

  if (argv.adapter) {

    config.adapter = {
      name: argv.adapter
    };
  }
  if (argv.brain) {
    config.brain = {
      name: argv.brain,
      conversationDuration: 86400000,
    }
  }
  if (argv.locale) {
    config.locale = argv.locale;
  }
  if (argv.logger) {
    config.logger = argv.logger;
  }
  if (argv.modules) {
    config.modules = [argv.modules.split(" ")];
  }
  const entityJsonConfig = {
    type: 'space',
    size: 2
  };

  const location = path.join(__dirname, '/templates/config.js');
  fs.copyTpl(
    location,
    `./${argv.name}-config.js`,
    {
      config: jsonFormat(config, entityJsonConfig),
    }
  );

  fs.commit(() => {
    console.log("Config created");
  });
}