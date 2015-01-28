var React = require( 'react' ),
    constants = require( '../../shared/constants/' );

module.exports = React.createClass({
    displayName: 'Description',

    render: function() {
        return (
            <section className="description">
                <header>
                    <h1 className="description__heading">What is { constants.app.NAME }?</h1>
                </header>
                <p className="description__content">
                    { constants.app.NAME } relays events from GitHub to your favorite chat client.
                    Common examples include sending a message when an issue is created or when a
                    comment is added. { constants.app.NAME } provides a number of filters to enable
                    you to be very selective in choosing which events are forwarded to your chat client.
                </p>
            </section>
        );
    }
});
