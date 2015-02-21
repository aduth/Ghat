var merge = require( 'lodash/object/merge' );

module.exports = {
    getInitialState: function() {
        return {
            values: this.getInitialIntegrationValue()
        };
    },

    getDefaultProps: function() {
        return {
            integration: {}
        };
    },

    getInitialIntegrationValue: function() {
        return {
            chat: {},
            github: {},
            filters: []
        };
    },

    getIntegrationValue: function() {
        // Merge to capture nested chat and GitHub settings, allowing saved
        // integration settings to be overwritten by form state. Overrides
        // array values instead of default merge via concatenation.
        return merge({}, this.props.integration, this.state.values, function( target, source ) {
            return Array.isArray( source ) ? source : undefined;
        });
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
        var chatIntegration = this.props.tokens.getConnectedChatProvider(),
            chatToken = this.props.tokens.get( chatIntegration );

        return this.props.contacts.get( chatIntegration, chatToken );
    }
};
