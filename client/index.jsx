var React = require( 'react' ),
    App = require( './components/app' ),
    constants = require( '../shared/constants/' ),
    storesInstances = require( '../shared/helpers/stores' ).getInstances(),
    app;

/**
 * Generate base application element
 */
app = module.exports = <App { ...storesInstances } />;

/**
 * Render element when in the context of a browser
 */
if ( 'undefined' !== typeof document ) {
    React.render( app, document.getElementById( constants.elements.CONTAINER ) );
}
