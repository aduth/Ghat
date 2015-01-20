var React = require( 'react/addons' ),
    observe = require( '../mixins/observe-store' ),
    ConfigureEvent = require( './configure-event' ),
    ConfigureRepository = require( './configure-repository' ),
    ConfigureContact = require( './configure-contact' ),
    stores = require( '../stores/' ),
    integrations = require( '../../shared/integrations/' );

module.exports = React.createClass({
    displayName: 'Configure',

    mixins: [ observe( 'tokens', 'contacts', 'repositories' ) ],

    getInitialState: function() {
        return {
            values: {},
            saving: false
        };
    },

    propTypes: {
        disabled: React.PropTypes.bool,
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        contacts: React.PropTypes.instanceOf( stores.Contact ).isRequired,
        repositories: React.PropTypes.instanceOf( stores.Repository ).isRequired
    },

    getDefaultProps: function() {
        return { disabled: true };
    },

    onSubmit: function() {
        this.setState({ saving: true });
        return false;
    },

    onValueChanged: function( name, value ) {
        this.state.values[ name ] = value;
    },

    getContacts: function() {
        var chatIntegration = this.props.tokens.getConnectedChatToken(),
            chatToken = this.props.tokens.get( chatIntegration );

        return this.props.contacts.get( chatIntegration, chatToken );
    },

    render: function() {
        var classes = React.addons.classSet({
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
                            <ConfigureEvent name="event" events={ integrations.github.getAvailableEvents() } onValueChanged={ this.onValueChanged } />
                            <ConfigureRepository name="repository" repositories={ this.props.repositories.get( this.props.tokens.get( 'github' ) ) } onValueChanged={ this.onValueChanged } />
                            <ConfigureContact name="contact" contacts={ this.getContacts() } onValueChanged={ this.onValueChanged } />
                        </ol>
                        <button type="submit" className="button configure__submit" disabled={ this.state.saving }>
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
