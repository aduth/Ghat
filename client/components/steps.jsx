var React = require( 'react' ),
    mixins = require( '../mixins/' ),
    helpers = require( '../../shared/helpers/' ),
    stores = require( '../stores/' ),
    Connection = require( './connection' ),
    Tabs = require( './tabs' );

module.exports = React.createClass({
    displayName: 'Steps',

    mixins: [
        mixins.observeStore([ 'tokens' ]),
        mixins.eventMonitor( 'router', 'route', 'resetManualEntry' )
    ],

    propTypes: {
        router: React.PropTypes.object.isRequired,
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        profiles: React.PropTypes.instanceOf( stores.Profile ).isRequired,
        contacts: React.PropTypes.instanceOf( stores.Contact ).isRequired,
        repositories: React.PropTypes.instanceOf( stores.Repository ).isRequired,
        hooks: React.PropTypes.instanceOf( stores.Hook ).isRequired,
        integrations: React.PropTypes.instanceOf( stores.Integration ).isRequired,
        notices: React.PropTypes.instanceOf( stores.Notice ).isRequired
    },

    getInitialState: function() {
        return {
            isManualEntry: false
        };
    },

    resetManualEntry: function() {
        if ( this.state.isManualEntry && '/configure' !== this.props.router.getRoute() ) {
            this.setState({ isManualEntry: false });
        }
    },

    setManualEntry: function( isManual ) {
        this.setState({ isManualEntry: isManual });

        if ( isManual ) {
            this.props.router.setRoute( '/configure' );
        }
    },

    isConnected: function() {
        return this.props.tokens.isConnectedToChat() && ( this.state.isManualEntry || this.props.tokens.isConnectedToGitHub() );
    },

    render: function() {
        return (
            <div className="steps">
                <Connection
                    name="github"
                    icon="github"
                    connected={ this.state.isManualEntry || this.props.tokens.isConnectedToGitHub() }
                    manual={ this.state.isManualEntry }
                    onManualEntryChange={ this.setManualEntry }
                    providers={ [ 'github' ] }
                    tokens={ this.props.tokens }
                    profiles={ this.props.profiles }
                    title="Connect to GitHub"
                    description="To automate the creation of webhooks, authorize Ghat to access your GitHub webhook settings." />
                <Connection
                    name="chat"
                    icon="comments"
                    connected={ this.props.tokens.isConnectedToChat() }
                    providers={ helpers.integrations.getChatIntegrations() }
                    tokens={ this.props.tokens }
                    profiles={ this.props.profiles }
                    title="Connect to Chat"
                    description="To allow Ghat to deliver messages to your preferred chat client, choose a supported service and authorize access to your account."  />
                <Tabs
                    router={ this.props.router }
                    manual={ this.state.isManualEntry }
                    disabled={ ! this.isConnected() }
                    tokens={ this.props.tokens }
                    integrations={ this.props.integrations }
                    contacts={ this.props.contacts }
                    repositories={ this.props.repositories }
                    hooks={ this.props.hooks }
                    notices={ this.props.notices } />
            </div>
        );
    }
});
