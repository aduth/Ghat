var React = require( 'react/addons' ),
    assign = require( 'lodash/object/assign' ),
    shortId = require( 'shortid' ),
    difference = require( 'lodash/array/difference' ),
    mixins = require( '../mixins/' ),
    ConfigureEvent = require( './configure-event' ),
    ConfigureRepository = require( './configure-repository' ),
    ConfigureFilters = require( './configure-filters' ),
    ConfigureContact = require( './configure-contact' ),
    stores = require( '../stores/' ),
    integrations = require( '../../shared/integrations/' ),
    crypto = require( 'crypto' ),
    config = require( '../../config' );

module.exports = React.createClass({
    displayName: 'Configure',

    mixins: [ mixins.observeStore([ 'tokens', 'contacts', 'repositories', 'hooks', 'integrations' ]) ],

    getInitialState: function() {
        return {
            values: {
                filters: []
            },
            saving: false
        };
    },

    propTypes: {
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        contacts: React.PropTypes.instanceOf( stores.Contact ).isRequired,
        repositories: React.PropTypes.instanceOf( stores.Repository ).isRequired,
        hooks: React.PropTypes.instanceOf( stores.Hook ).isRequired,
        integrations: React.PropTypes.instanceOf( stores.Integration ).isRequired
    },

    onSubmit: function( event ) {
        var githubToken = this.props.tokens.get( 'github' ),
            chatIntegration = this.props.tokens.getConnectedChatToken(),
            chatToken = this.props.tokens.get( chatIntegration ),
            integration;

        integration = {
            _id: shortId.generate(),
            chat: {
                provider: chatIntegration,
                token: chatToken,
                contact: this.state.values.contact
            },
            filters: this.state.values.filters.filter( Boolean ),
            secret: crypto.randomBytes( config.security.secretLength ).toString( 'hex' )
        };

        this.props.hooks.create(
            githubToken,
            this.state.values.repository,
            this.state.values.events,
            integration,
            function( err, hook ) {
                if ( ! err ) {
                    integration.github = { hookUrl: hook.url };
                    this.props.integrations.create( integration );
                }
            }.bind( this )
        );

        this.setState({ saving: true });
        this.props.integrations.once( 'change', function() {
            this.setState({ saving: false });
        }.bind( this ) );

        event.preventDefault();
    },

    onValueChanged: function( name, value ) {
        var pair = {};
        pair[ name ] = value;

        this.setState({
            values: assign( {}, this.state.values, pair )
        });
    },

    getContacts: function() {
        var chatIntegration = this.props.tokens.getConnectedChatToken(),
            chatToken = this.props.tokens.get( chatIntegration );

        return this.props.contacts.get( chatIntegration, chatToken );
    },

    render: function() {
        var canSubmit = ! difference([ 'events', 'repository', 'contact' ], Object.keys( this.state.values ) ).length,
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
                        <ConfigureEvent events={ integrations.github.getAvailableEvents() } value={ this.state.values.events } onValueChanged={ this.onValueChanged.bind( null, 'events' ) } />
                        <ConfigureRepository repositories={ this.props.repositories.get( this.props.tokens.get( 'github' ) ) } value={ this.state.values.repository } onValueChanged={ this.onValueChanged.bind( null, 'repository' ) } />
                        <ConfigureFilters filters={ integrations.github.getPredefinedFilters() } value={ this.state.values.filters } onValueChanged={ this.onValueChanged.bind( null, 'filters' ) } />
                        <ConfigureContact contacts={ this.getContacts() } value={ this.state.values.contact } onValueChanged={ this.onValueChanged.bind( null, 'contact' ) } />
                    </ol>
                    <button type="submit" className="button configure__submit" disabled={ ! canSubmit || this.state.saving }>
                        { this.state.saving ? <span className="configure__pending fa fa-spinner fa-spin" /> : 'Create' }
                    </button>
                </form>
            </div>
        );
    }
});
