const { <%= promptType %>Dialog } = require('botfuel-dialog');

class <%= dialogName %>Dialog extends <%= promptType %>Dialog {}

<%= dialogName %>.params = {
  namespace: '<%= namespace %>',
  entities: 
    <%- entities %>
  ,
};

module.exports = <%= dialogName %>Dialog;
