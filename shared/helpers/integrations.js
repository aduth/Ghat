var integrations = require( '../integrations/' );

module.exports = {
    /**
     * Returns an array of integrations which are capable of sending messages
     * to a chat client.
     */
    getChatIntegrations: function() {
        return Object.keys( integrations ).filter(function( name ) {
            return 'function' === typeof integrations[ name ].sendMessage;
        });
    }
};
