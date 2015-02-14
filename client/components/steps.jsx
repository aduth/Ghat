var React = require( 'react' ),
    mixins = require( '../mixins/' ),
    sharedHelpers = require( '../../shared/helpers/' ),
    clientHelpers = require( '../helpers/' ),
    stores = require( '../stores/' ),
    Connection = require( './connection' ),
    TabsList = require( '../components/tabs-list' ),
    TabsPanel = require( '../components/tabs-panel' ),
    Configure = require( '../components/configure' ),
    Integrations = require( '../components/integrations' );

module.exports = React.createClass({
    displayName: 'Steps',

    mixins: [
        mixins.observeStore([ 'tokens', 'contacts', 'repositories' ]),
        mixins.updateOnRoute
    ],

    propTypes: {
        router: React.PropTypes.object.isRequired,
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        profiles: React.PropTypes.instanceOf( stores.Profile ).isRequired,
        contacts: React.PropTypes.instanceOf( stores.Contact ).isRequired,
        repositories: React.PropTypes.instanceOf( stores.Repository ).isRequired,
        hooks: React.PropTypes.instanceOf( stores.Hook ).isRequired,
        integrations: React.PropTypes.instanceOf( stores.Integration ).isRequired
    },

    render: function() {
        var integrationStore = clientHelpers.stores.getSingletonInstance( 'Integration' );

        return (
            <div className="steps">
                <Connection
                    name="github"
                    icon="github"
                    providers={ [ 'github' ] }
                    tokens={ this.props.tokens }
                    profiles={ this.props.profiles }
                    title="Connect to GitHub"
                    description="To create the webhooks necessary to relay events to your chat client, you must authorize Ghat to access your GitHub account. GitHub tokens are never saved to Ghat's servers." />
                <Connection
                    name="chat"
                    icon="comments"
                    providers={ sharedHelpers.integrations.getChatIntegrations() }
                    tokens={ this.props.tokens }
                    profiles={ this.props.profiles }
                    title="Connect to Chat"
                    description="To allow Ghat to send messages to your chat client, you must authorize access to your account." />
                <div className={ 'steps__tabs ' + ( this.props.tokens.isConnected() ? '' : 'disabled' ) }>
                <TabsList defaultActive="My Integrations">
                    <TabsPanel name="My Integrations" href="/" active={ '/' === this.props.router.getRoute() }>
                        <Integrations
                            tokens={ clientHelpers.stores.getSingletonInstance( 'Token' ) }
                            integrations={ clientHelpers.stores.getSingletonInstance( 'Integration' ) } />
                    </TabsPanel>
                    <TabsPanel name="Create New Integration" href="/configure" active={ /^\/configure(\/[\w-]+)?$/.test( this.props.router.getRoute() ) }>
                        <Configure
                            integration={ integrationStore.get( this.props.router.getRouteParameter( /^\/configure(\/([\w-]+))?$/, 2 ) ) }
                            tokens={ clientHelpers.stores.getSingletonInstance( 'Token' ) }
                            contacts={ clientHelpers.stores.getSingletonInstance( 'Contact' ) }
                            repositories={ clientHelpers.stores.getSingletonInstance( 'Repository' ) }
                            hooks={ clientHelpers.stores.getSingletonInstance( 'Hook' ) }
                            integrations={ integrationStore } />
                    </TabsPanel>
                </TabsList>
                    <aside className="steps__tabs-disabled-content">
                        You must complete the authorization steps above before configuring integrations.
                    </aside>
                </div>
            </div>
        );
    }
});
