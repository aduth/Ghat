var React = require( 'react' ),
    App = require( './components/app' ),
    controller = require( './controller' ),
    tokenObserver = require( './observers/token' ),
    container;

/**
 * Bootstrap application
 */
tokenObserver.listen();

/**
 * Render base application element
 */
container = document.createElement( 'div' );
document.body.appendChild( container );
React.render( <App />, container );

/**
 * Trigger controller action
 */
controller.home();