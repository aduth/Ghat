var React = require( 'react' ),
    App = require( './components/app' ),
    container;

container = document.createElement( 'div' );
document.documentElement.appendChild( container );
React.render( <App />, container );