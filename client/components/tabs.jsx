var React = require( 'react/addons' ),
    mixins = require( '../mixins/' ),
    stores = require( '../stores/' ),
    TabsList = require( './tabs-list' ),
    TabsPanel = require( './tabs-panel' ),
    Configure = require( './configure' ),
    Integrations = require( './integrations' );

module.exports = React.createClass({
    displayName: 'Tabs',

    mixins: [
        mixins.observeStore([ 'integrations' ]),
        mixins.updateOnRoute
    ],

    propTypes: {
        router: React.PropTypes.object.isRequired,
        disabled: React.PropTypes.bool,
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        contacts: React.PropTypes.instanceOf( stores.Contact ).isRequired,
        repositories: React.PropTypes.instanceOf( stores.Repository ).isRequired,
        hooks: React.PropTypes.instanceOf( stores.Hook ).isRequired,
        integrations: React.PropTypes.instanceOf( stores.Integration ).isRequired,
        notices: React.PropTypes.instanceOf( stores.Notice ).isRequired
    },

    getDefaultProps: function() {
        return {
            disabled: true
        };
    },

    getCurrentIntegrationId: function() {
        return this.props.router.getRouteParameter( /^\/configure(\/([\w-]+))?$/, 2 );
    },

    getIntegration: function() {
        return this.props.integrations.getById( this.getCurrentIntegrationId() ) || this.props.integrations.generate();
    },

    render: function() {
        var classes = React.addons.classSet({
            tabs: true,
            disabled: this.props.disabled
        });

        return (
            <div className={ classes }>
                <TabsList defaultActive="My Integrations">
                    <TabsPanel name="My Integrations" href="/" active={ '/' === this.props.router.getRoute() }>
                        <Integrations
                            tokens={ this.props.tokens }
                            hooks={ this.props.hooks }
                            integrations={ this.props.integrations }
                            notices={ this.props.notices } />
                    </TabsPanel>
                    <TabsPanel name="Create New Integration" href="/configure" active={ /^\/configure(\/[\w-]+)?$/.test( this.props.router.getRoute() ) }>
                        <Configure
                            new={ ! this.getCurrentIntegrationId() }
                            router={ this.props.router }
                            tokens={ this.props.tokens }
                            integrations={ this.props.integrations }
                            integration={ this.getIntegration() }
                            contacts={ this.props.contacts }
                            repositories={ this.props.repositories }
                            hooks={ this.props.hooks }
                            notices={ this.props.notices } />
                    </TabsPanel>
                </TabsList>
                <aside className="tabs__disabled-content">
                    You must complete the authorization steps above before configuring integrations.
                </aside>
            </div>
        );
    }
});
