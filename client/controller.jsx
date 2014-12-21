var React = require( 'react' ),
    Steps = require( './components/steps' ),
    constants = require( './constants/' ),
    stores = require( './stores/' );

module.exports = {
    home: function() {
        React.render(
            <Steps tokens={ stores.token } />,
            document.getElementById( constants.elements.CONTENT )
        );
    }
};