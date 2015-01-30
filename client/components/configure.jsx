var React = require( 'react/addons' ),
    async = require( 'async' ),
    assign = require( 'lodash/object/assign' ),
    difference = require( 'lodash/array/difference' ),
    observe = require( '../mixins/observe-store' ),
    ConfigureEvent = require( './configure-event' ),
    ConfigureRepository = require( './configure-repository' ),
    ConfigureFilters = require( './configure-filters' ),
    ConfigureContact = require( './configure-contact' ),
    stores = require( '../stores/' ),
    integrations = require( '../../shared/integrations/' );

module.exports = React.createClass({
    displayName: 'Configure',

    mixins: [ observe( 'tokens', 'contacts', 'repositories', 'hooks', 'integrations' ) ],

    getInitialState: function() {
        return {
            values: {
                filters: []
            },
            saving: false
        };
    },

    propTypes: {
        disabled: React.PropTypes.bool,
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        contacts: React.PropTypes.instanceOf( stores.Contact ).isRequired,
        repositories: React.PropTypes.instanceOf( stores.Repository ).isRequired,
        hooks: React.PropTypes.instanceOf( stores.Hook ).isRequired,
        integrations: React.PropTypes.instanceOf( stores.Integration ).isRequired
    },

    getDefaultProps: function() {
        return { disabled: true };
    },

    onSubmit: function( event ) {
        var githubToken = this.props.tokens.get( 'github' ),
            chatIntegration = this.props.tokens.getConnectedChatToken(),
            chatToken = this.props.tokens.get( chatIntegration );

        this.props.hooks.create(
            githubToken,
            this.state.values.repository,
            this.state.values.event,
            this.props.integrations.create({
                chat: {
                    provider: chatIntegration,
                    token: chatToken,
                    contact: this.state.values.contact
                },
                filters: this.state.values.filters.filter( Boolean )
            })
        );

        async.parallel([
            function( next ) {
                this.props.integrations.once( 'change', next );
            }.bind( this ),
            function( next ) {
                this.props.hooks.once( 'change', next );
            }.bind( this )
        ], function() {
            this.setState({ saving: false });
        }.bind( this ) );

        this.setState({ saving: true });
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
        var canSubmit = ! difference([ 'event', 'repository', 'contact' ], Object.keys( this.state.values ) ).length,
            classes = React.addons.classSet({
                configure: true,
                disabled: this.props.disabled,
                saving: this.state.saving
            });

        return (
            <div className={ classes }>
                <div className="configure__content">
                    <header className="configure__header">
                        <h1 className="configure__heading">Configure an Integration</h1>
                    </header>
                    <form onSubmit={ this.onSubmit } className="configure__form">
                        <ol className="configure__steps">
                            <ConfigureEvent events={ integrations.github.getAvailableEvents() } value={ this.state.values.event } onValueChanged={ this.onValueChanged.bind( null, 'event' ) } />
                            <ConfigureRepository repositories={ this.props.repositories.get( this.props.tokens.get( 'github' ) ) } value={ this.state.values.repository } onValueChanged={ this.onValueChanged.bind( null, 'repository' ) } />
                            <ConfigureFilters filters={ integrations.github.getPredefinedFilters() } value={ this.state.values.filters } onValueChanged={ this.onValueChanged.bind( null, 'filters' ) } />
                            <ConfigureContact contacts={ this.getContacts() } value={ this.state.values.contact } onValueChanged={ this.onValueChanged.bind( null, 'contact' ) } />
                        </ol>
                        <button type="submit" className="button configure__submit" disabled={ ! canSubmit || this.state.saving }>
                            { this.state.saving ? <span className="configure__pending fa fa-spinner fa-spin" /> : 'Create' }
                        </button>
                    </form>
                    <aside className="configure__disabled-content">
                        You must complete the authorization steps above before creating an integration.
                    </aside>
                </div>
            </div>
        );
    }
});
