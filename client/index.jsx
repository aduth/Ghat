var React = require( 'react' ),
    App = require( './components/app' ),
    constants = require( '../shared/constants/' ),
    helpers = require( './helpers/' ),
    config = require( '../config' ),
    Router = require( './router' ),
    routes = require( './routes' ),
    app, router;

/**
 * Generate base application element
 */
app = module.exports = (
    <App
        config={ config }
        tokens={ new helpers.stores.getSingletonInstance( 'Token' ) }
        profiles={ new helpers.stores.getSingletonInstance( 'Profile' ) }
        contacts={ new helpers.stores.getSingletonInstance( 'Contact' ) }
        repositories={ new helpers.stores.getSingletonInstance( 'Repository' ) }
        hooks={ new helpers.stores.getSingletonInstance( 'Hook' ) }
        integrations={ new helpers.stores.getSingletonInstance( 'Integration' ) } />
);

if ( 'undefined' !== typeof document ) {
    /**
     * Render element when in the context of a browser
     */
    React.render( app, document.getElementById( constants.elements.CONTAINER ) );

    /**
     * Bind path routing
     */
    router = new Router( routes );
    router.attach( document.body );
    router.start();
}
