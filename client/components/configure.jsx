var React = require( 'react/addons' ),
    merge = require( 'lodash/object/merge' ),
    mixins = require( '../mixins/' ),
    ConfigureEvent = require( './configure-event' ),
    ConfigureRepository = require( './configure-repository' ),
    ConfigureFilters = require( './configure-filters' ),
    ConfigureContact = require( './configure-contact' ),
    stores = require( '../stores/' ),
    integrations = require( '../../shared/integrations/' );

module.exports = React.createClass({
    displayName: 'Configure',

    mixins: [
        mixins.observeStore([ 'tokens', 'contacts', 'repositories', 'hooks', 'integrations' ])
    ],

    getInitialState: function() {
        return {
            values: {
                chat: {},
                github: {},
                filters: []
            },
            saving: false
        };
    },

    propTypes: {
        new: React.PropTypes.bool,
        router: React.PropTypes.object.isRequired,
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        integrations: React.PropTypes.instanceOf( stores.Integration ).isRequired,
        integration: React.PropTypes.object,
        contacts: React.PropTypes.instanceOf( stores.Contact ).isRequired,
        repositories: React.PropTypes.instanceOf( stores.Repository ).isRequired,
        hooks: React.PropTypes.instanceOf( stores.Hook ).isRequired
    },

    getDefaultProps: function() {
        return {
            new: true,
            integration: {}
        };
    },

    getIntegrationValue: function() {
        return merge({}, this.props.integration, this.state.values );
    },

    onSubmit: function( event ) {
        var integration = this.getIntegrationValue();

        integration.github.token = this.props.tokens.get( 'github' );
        integration.chat.provider = this.props.tokens.getConnectedChatToken();
        integration.chat.token = this.props.tokens.get( integration.chat.provider );

        this.props.hooks.create(
            integration.github.token,
            integration.github.repository,
            integration.github.events,
            integration,
            function( err, hook ) {
                if ( ! err ) {
                    integration.github.hookUrl = hook.url;
                    this.props.integrations.create( integration );
                }
            }.bind( this )
        );

        this.setState({ saving: true });
        this.props.integrations.once( 'change', function() {
            this.setState({ saving: false });
            this.props.router.setRoute( '/' );
        }.bind( this ) );

        event.preventDefault();
    },

    onValueChanged: function( name, value ) {
        var integration = this.getIntegrationValue();

        switch ( name ) {
            case 'events': integration.github.events = value; break;
            case 'repository': integration.github.repository = value; break;
            case 'filters': integration.filters = value; break;
            case 'contact': integration.chat.contact = value; break;
            default: break;
        }

        this.setState({ values: integration });
    },

    getContacts: function() {
        var chatIntegration = this.props.tokens.getConnectedChatToken(),
            chatToken = this.props.tokens.get( chatIntegration );

        return this.props.contacts.get( chatIntegration, chatToken );
    },

    render: function() {
        var integration = this.getIntegrationValue(),
            canSubmit = integration.github.events && integration.github.repository && integration.chat.contact,
            classes = React.addons.classSet({
                configure: true,
                saving: this.state.saving
            });

        return (
            <div className={ classes }>
                <header className="configure__header">
                    <h1 className="configure__heading">Configure an Integration</h1>
                </header>
                <form onSubmit={ this.onSubmit } className="configure__form">
                    <ol className="configure__steps">
                        <ConfigureEvent events={ integrations.github.getAvailableEvents() } value={ integration.github.events } onValueChanged={ this.onValueChanged.bind( null, 'events' ) } />
                        <ConfigureRepository repositories={ this.props.repositories.get( this.props.tokens.get( 'github' ) ) } value={ integration.github.repository } onValueChanged={ this.onValueChanged.bind( null, 'repository' ) } />
                        <ConfigureFilters filters={ integrations.github.getPredefinedFilters() } value={ integration.filters } onValueChanged={ this.onValueChanged.bind( null, 'filters' ) } />
                        <ConfigureContact contacts={ this.getContacts() } value={ integration.chat.contact } onValueChanged={ this.onValueChanged.bind( null, 'contact' ) } />
                    </ol>
                    <button type="submit" className="button configure__submit" disabled={ ! canSubmit || this.state.saving }>
                        { this.state.saving ? <span className="configure__pending fa fa-spinner fa-spin" /> : 'Create' }
                    </button>
                </form>
            </div>
        );
    }
});
