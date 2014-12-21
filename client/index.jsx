var React = require( 'react' ),
    App = require( './components/app' ),
    container;

container = document.createElement( 'div' );
document.body.appendChild( container );
React.render( <App />, container );