var React = require( 'react' ),
    App = require( './components/app' ),
    controller = require( './controller' ),
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

/**
 * Trigger controller action
 */
controller.home();