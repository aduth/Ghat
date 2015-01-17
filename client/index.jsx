var React = require( 'react' ),
    App = require( './components/app' ),
    tokenObserver = require( './observers/token' ),
    constants = require( './constants/' );

/**
 * Bootstrap application
 */
tokenObserver.listen();

/**
 * Render base application element
 */
React.render( <App />, document.getElementById( constants.elements.CONTAINER ) );
