var React = require( 'react/addons' ),
    observe = require( '../mixins/observe-store' ),
    ConfigureEvent = require( './configure-event' ),
    ConfigureContact = require( './configure-contact' ),
    TokenStore = require( '../stores/token' ),
    ContactStore = require( '../stores/contact' ),
    integrations = require( '../../shared/integrations/' );

module.exports = React.createClass({
    displayName: 'Configure',

    mixins: [ observe( 'tokens', 'contacts' ) ],

    getInitialState: function() {
        return { values: {} };
    },

    propTypes: {
        disabled: React.PropTypes.bool,
        tokens: React.PropTypes.instanceOf( TokenStore ).isRequired,
        contacts: React.PropTypes.instanceOf( ContactStore ).isRequired
    },

    getDefaultProps: function() {
        return { disabled: true };
    },

    onSubmit: function() {
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
            disabled: this.props.disabled
        });

        return (
            <div className={ classes }>
                <div className="configure__content">
                    <header className="configure__header">
                        <h1 className="configure__heading">Configure an Integration</h1>
                    </header>
                    <form onSubmit={ this.onSubmit } className="configure__form">
                        <ConfigureEvent name="event" events={ integrations.github.getAvailableEvents() } onValueChanged={ this.onValueChanged } />
                        <ConfigureContact name="contact" contacts={ this.getContacts() } onValueChanged={ this.onValueChanged } />
                    </form>
                    <aside className="configure__disabled-content">
                        You must complete the authorization steps above before creating an integration.
                    </aside>
                </div>
            </div>
        );
    }
});
