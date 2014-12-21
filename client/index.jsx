var React = require( 'react' ),
    App = require( './components/app' ),
    container;

container = document.createElement( 'div' );
document.body.appendChild( container );
React.render( <App tokens={ require( './stores/token' )() } />, container );

require( './observers/token' ).listen();