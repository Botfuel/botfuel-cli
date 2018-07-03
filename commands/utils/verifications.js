const chalk = require('chalk');

function checkIntentName(argv, type) {
  const name_validation = /^[a-z0-9]+[a-z0-9-]*[a-z0-9]+$/;

  if (!name_validation.test(argv.name)) {
    console.log(`${chalk.bgHex('#ac2925')(' ERROR ')} ${chalk.hex('#c9302c')(type + ' name must contain only lowercase letters, numbers, hyphens, without spaces. It cannot begin or end with a hyphen.')}`);
    return false;
  }
  if (name_validation.length > 200) {
    console.log(`${chalk.bgHex('#ac2925')(' ERROR ')} ${chalk.hex('#c9302c')(type + ' name must be no longer than 200 characters.')}`);
    return false;
  }

  return true;
}

// function checkDialog(argv) {
//   const name_validation = /^[a-z0-9]+[a-z0-9-]*[a-z0-9]+$/;
//   if (!name_validation.test(argv.name)) {
//     console.log(`${chalk.bgHex('#ac2925')(' ERROR ')} ${chalk.hex('#c9302c')(type + ' name must contain only lowercase letters, numbers, hyphens, without spaces. It cannot begin or end with a hyphen.')}`);
//     return false;
//   }
//   if (name_validation.length > 200) {
//     console.log(`${chalk.bgHex('#ac2925')(' ERROR ')} ${chalk.hex('#c9302c')(type + ' name must be no longer than 200 characters.')}`);
//     return false;
//   }

//   return true;
// }

module.exports.checkIntentName = checkIntentName;
// module.exports.checkDialog = checkDialog;