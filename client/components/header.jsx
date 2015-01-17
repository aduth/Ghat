var React = require( 'react' ),
    constants = require( '../constants/' );

module.exports = React.createClass({
    displayName: 'Header',

    render: function() {
        return (
            <header className="header">
                <a href="/" className="header__brand">{ constants.app.NAME }</a>
            </header>
        );
    }
});
