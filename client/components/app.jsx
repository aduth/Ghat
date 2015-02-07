var React = require( 'react' ),
    stores = require( '../stores/' ),
    tokenObserver = require( '../observers/token' ),
    GitHubRibbon = require( './github-ribbon' ),
    Header = require( './header' ),
    Description = require( './description' ),
    Steps = require( './steps' );

module.exports = React.createClass({
    displayName: 'App',

    propTypes: {
        config: React.PropTypes.object,
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        profiles: React.PropTypes.instanceOf( stores.Profile ).isRequired,
        contacts: React.PropTypes.instanceOf( stores.Contact ).isRequired,
        repositories: React.PropTypes.instanceOf( stores.Repository ).isRequired,
        hooks: React.PropTypes.instanceOf( stores.Hook ).isRequired,
        integrations: React.PropTypes.instanceOf( stores.Integration ).isRequired
    },

    componentDidMount: function() {
        tokenObserver.listen( this.props.tokens );
    },

    componentWillUnmount: function() {
        tokenObserver.stopListening();
    },

    getGitHubRibbonElement: function() {
        if ( this.props.config.homebase ) {
            return <GitHubRibbon config={ this.props.config } />;
        }
    },

    render: function() {
        return (
            <div className="app__container">
                <Header />
                { this.getGitHubRibbonElement() }
                <main className="app__content">
                    <Description />
                    <Steps { ...this.props } />
                </main>
            </div>
        );
    }
});
