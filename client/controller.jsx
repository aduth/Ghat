var React = require( 'react' ),
    Steps = require( './components/steps' ),
    constants = require( './constants/' );

module.exports = {
    home: function() {
        React.render(
            <Steps tokens={ require( './stores/token' )() } />,
            document.getElementById( constants.elements.CONTENT )
        );
    }
};