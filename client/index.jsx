var React = require( 'react' ),
    App = require( './components/app' ),
    tokenObserver = require( './observers/token' ),
    constants = require( '../shared/constants/' ),
    storesInstances = require( '../shared/helpers/stores' ).getInstances();

/**
 * Bootstrap application
 */
tokenObserver.listen( storesInstances.tokens );

/**
 * Render base application element
 */
React.render(
    <App { ...storesInstances } />,
    document.getElementById( constants.elements.CONTAINER )
);
