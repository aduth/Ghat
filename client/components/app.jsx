var React = require( 'react' ),
    Header = require( './header' );

module.exports = React.createClass({
    displayName: 'App',

    render: function() {
        return (
            <div className="app-container">
                <Header />
                <main id="primary-content" />
            </div>
        );
    }
});