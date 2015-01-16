var integrations = require( '../integrations/' );

module.exports = {
    getChatIntegrations: function() {
        return Object.keys( integrations ).filter(function( name ) {
            return 'function' === typeof integrations[ name ].sendMessage;
        });
    }
};
