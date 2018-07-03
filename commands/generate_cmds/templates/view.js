const { View, BotTextMessage } = require('botfuel-dialog');

class <%= viewName %>View extends View {
  render() {
    return [
      new BotTextMessage('In <%= viewName %> view!'),
    ];
  }
}

module.exports = <%= viewName %>View;
