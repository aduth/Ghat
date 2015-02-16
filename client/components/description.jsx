var React = require( 'react' ),
    constants = require( '../../shared/constants/' ),
    manifest = require( '../../package' );

module.exports = React.createClass({
    displayName: 'Description',

    render: function() {
        return (
            <section className="description">
                <header>
                    <h1 className="description__heading">What is { constants.app.NAME }?</h1>
                </header>
                <p className="description__content">
                    { constants.app.NAME } sends messages to your favorite chat service when actions are taken at a GitHub
                    repository, helping you to keep up-to-date with the latest events. A variety of chat services are supported,
                    and filtering options allow you to selectively choose which types of messages are sent. The project is made
                    freely available on GitHub under the { manifest.license } license.
                </p>
            </section>
        );
    }
});
