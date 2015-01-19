var React = require( 'react' ),
    stores = require( '../stores/' ),
    Header = require( './header' ),
    Steps = require( './steps' );

module.exports = React.createClass({
    displayName: 'App',

    propTypes: {
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        profiles: React.PropTypes.instanceOf( stores.Profile ).isRequired,
        contacts: React.PropTypes.instanceOf( stores.Contact ).isRequired,
        repositories: React.PropTypes.instanceOf( stores.Repository ).isRequired
    },

    render: function() {
        return (
            <div className="app__container">
                <Header />
                <main className="app__content">
                    <Steps { ...this.props } />
                </main>
            </div>
        );
    }
});
