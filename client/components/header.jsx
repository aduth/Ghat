var React = require( 'react' ),
    constants = require( '../constants' );

module.exports = React.createClass({
    displayName: 'Header',

    render: function() {
        return (
            <header className="header-brand">
                <h1>{ constants.APP_NAME }</h1>
            </header>
        );
    }
});