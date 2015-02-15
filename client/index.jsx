var React = require( 'react' ),
    App = require( './components/app' ),
    constants = require( '../shared/constants/' ),
    helpers = require( './helpers/' ),
    config = require( '../shared/config' ),
    Router = require( './router' ),
    router = new Router(),
    app;

/**
 * Generate base application element
 */
app = module.exports = (
    <App
        config={ config }
        router={ router }
        tokens={ helpers.stores.getSingletonInstance( 'Token' ) }
        profiles={ helpers.stores.getSingletonInstance( 'Profile' ) }
        contacts={ helpers.stores.getSingletonInstance( 'Contact' ) }
        repositories={ helpers.stores.getSingletonInstance( 'Repository' ) }
        hooks={ helpers.stores.getSingletonInstance( 'Hook' ) }
        integrations={ helpers.stores.getSingletonInstance( 'Integration' ) } />
);

if ( 'undefined' !== typeof document ) {
    /**
     * Render element when in the context of a browser
     */
    React.render( app, document.getElementById( constants.elements.CONTAINER ) );

    /**
     * Bind path routing
     */
    router.attach( document.body );
    router.start();
}
