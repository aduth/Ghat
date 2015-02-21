var React = require( 'react/addons' ),
    async = require( 'async' ),
    mixins = require( '../mixins/' ),
    stores = require( '../stores/' ),
    ConfigureEvent = require( './configure-event' ),
    ConfigureRepository = require( './configure-repository' ),
    ConfigureFilters = require( './configure-filters' ),
    ConfigureContact = require( './configure-contact' ),
    integrations = require( '../../shared/integrations/' );

module.exports = React.createClass({
    displayName: 'ConfigureAuthenticated',

    mixins: [
        mixins.configure,
        mixins.observeStore([ 'tokens', 'contacts', 'repositories', 'hooks', 'integrations' ])
    ],

    propTypes: {
        new: React.PropTypes.bool,
        router: React.PropTypes.object.isRequired,
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        integrations: React.PropTypes.instanceOf( stores.Integration ).isRequired,
        integration: React.PropTypes.object,
        contacts: React.PropTypes.instanceOf( stores.Contact ).isRequired,
        repositories: React.PropTypes.instanceOf( stores.Repository ).isRequired,
        hooks: React.PropTypes.instanceOf( stores.Hook ).isRequired,
        notices: React.PropTypes.instanceOf( stores.Notice ).isRequired
    },

    getDefaultProps: function() {
        return {
            new: true
        };
    },

    onSubmit: function( event ) {
        var integration = this.getIntegrationValue(),
            action = this.props.new ? 'create' : 'update';

        integration.github.token = this.props.tokens.get( 'github' );
        integration.chat.provider = this.props.tokens.getConnectedChatToken();
        integration.chat.token = this.props.tokens.get( integration.chat.provider );

        async.waterfall([
            this.props.hooks[ action ].bind( this.props.hooks, integration.github.token, integration ),
            function( hook, next ) {
                integration.github.hookId = hook.id;
                this.props.integrations[ action ]( integration, next );
            }.bind( this )
        ], function() {
            this.props.notices.add( 'Successfully ' + action + 'd an integration' );
        }.bind( this ) );

        this.setState({
            values: this.getInitialIntegrationValue()
        });
        this.props.router.setRoute( '/' );
        event.preventDefault();
    },

    render: function() {
        var integration = this.getIntegrationValue(),
            canSubmit = integration.github.events && integration.github.repository && integration.chat.contact;

        return (
            <div className="configure">
                <form onSubmit={ this.onSubmit } className="configure__form">
                    <ol className="configure__steps">
                        <ConfigureEvent
                            key="event"
                            events={ integrations.github.getAvailableEvents() }
                            value={ integration.github.events }
                            onValueChanged={ this.onValueChanged.bind( null, 'events' ) } />
                        <ConfigureRepository
                            key="repository"
                            repositories={ this.props.repositories.get( this.props.tokens.get( 'github' ) ) }
                            value={ integration.github.repository }
                            onValueChanged={ this.onValueChanged.bind( null, 'repository' ) } />
                        <ConfigureFilters
                            key="filters"
                            filters={ integrations.github.getPredefinedFilters( integration.github.events ) }
                            value={ integration.filters }
                            onValueChanged={ this.onValueChanged.bind( null, 'filters' ) } />
                        <ConfigureContact
                            key="contact"
                            contacts={ this.getContacts() }
                            value={ integration.chat.contact }
                            onValueChanged={ this.onValueChanged.bind( null, 'contact' ) } />
                    </ol>
                    <button type="submit" className="button configure__submit" disabled={ ! canSubmit }>
                        { this.props.new ? 'Create' : 'Update' }
                    </button>
                </form>
            </div>
        );
    }
});
