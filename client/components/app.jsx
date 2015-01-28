var React = require( 'react' ),
    stores = require( '../stores/' ),
    Header = require( './header' ),
    Description = require( './description' ),
    Steps = require( './steps' );

module.exports = React.createClass({
    displayName: 'App',

    propTypes: {
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        profiles: React.PropTypes.instanceOf( stores.Profile ).isRequired,
        contacts: React.PropTypes.instanceOf( stores.Contact ).isRequired,
        repositories: React.PropTypes.instanceOf( stores.Repository ).isRequired,
        hooks: React.PropTypes.instanceOf( stores.Hook ).isRequired,
        integrations: React.PropTypes.instanceOf( stores.Integration ).isRequired
    },

    render: function() {
        return (
            <div className="app__container">
                <Header />
                <main className="app__content">
                    <Description />
                    <Steps { ...this.props } />
                </main>
            </div>
        );
    }
});
