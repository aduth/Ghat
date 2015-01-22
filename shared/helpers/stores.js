var stores = require( '../../client/stores/' );

module.exports = {
    getInstances: function() {
        return {
            tokens: new stores.Token(),
            profiles: new stores.Profile(),
            contacts: new stores.Contact(),
            repositories: new stores.Repository(),
            hooks: new stores.Hook(),
            integrations: new stores.Integration()
        };
    }
};
