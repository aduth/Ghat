var React = require( 'react' ),
    App = require( './components/app' ),
    constants = require( '../shared/constants/' ),
    stores = require( './stores/' ),
    app;

/**
 * Generate base application element
 */
app = module.exports = (
    <App
        tokens={ new stores.Token() }
        profiles={ new stores.Profile() }
        contacts={ new stores.Contact() }
        repositories={ new stores.Repository() }
        hooks={ new stores.Hook() }
        integrations={ new stores.Integration() } />
);

/**
 * Render element when in the context of a browser
 */
if ( 'undefined' !== typeof document ) {
    React.render( app, document.getElementById( constants.elements.CONTAINER ) );
}
