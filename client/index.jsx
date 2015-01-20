var React = require( 'react' ),
    App = require( './components/app' ),
    tokenObserver = require( './observers/token' ),
    constants = require( '../shared/constants/' ),
    stores = require( './stores/' ),
    tokenStore = new stores.Token();

/**
 * Bootstrap application
 */
tokenObserver.listen( tokenStore );

/**
 * Render base application element
 */
React.render(
    <App
        tokens={ tokenStore }
        profiles={ new stores.Profile() }
        contacts={ new stores.Contact() }
        repositories={ new stores.Repository() }
        hooks={ new stores.Hook() }
        integrations={ new stores.Integration() } />,
    document.getElementById( constants.elements.CONTAINER )
);
