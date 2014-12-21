var React = require( 'react' ),
    Steps = require( './components/steps' );

module.exports = {
    home: function() {
        React.render(
            <Steps tokens={ require( './stores/token' )() } />,
            document.getElementById( 'primary-content' )
        );
    }
};