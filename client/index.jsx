var React = require( 'react' ),
    App = require( './components/app' ),
    constants = require( '../shared/constants/' ),
    storesInstances = require( '../shared/helpers/stores' ).getInstances();

/**
 * Render base application element
 */
React.render(
    <App { ...storesInstances } />,
    document.getElementById( constants.elements.CONTAINER )
);
