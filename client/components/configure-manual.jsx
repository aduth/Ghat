var React = require( 'react' ),
    classNames = require( 'classnames' ),
    mixins = require( '../mixins/' ),
    stores = require( '../stores/' ),
    ConfigureFilters = require( './configure-filters' ),
    ConfigureContact = require( './configure-contact' ),
    ConfigureDetails = require( './configure-details' ),
    integrations = require( '../../shared/integrations/' );

module.exports = React.createClass({
    displayName: 'ConfigureManual',

    mixins: [
        mixins.configure,
        mixins.observeStore([ 'tokens', 'contacts', 'integrations' ])
    ],

    propTypes: {
        router: React.PropTypes.object.isRequired,
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        integrations: React.PropTypes.instanceOf( stores.Integration ).isRequired,
        integration: React.PropTypes.object,
        contacts: React.PropTypes.instanceOf( stores.Contact ).isRequired,
        notices: React.PropTypes.instanceOf( stores.Notice ).isRequired
    },

    getInitialState: function() {
        return {
            isComplete: false
        };
    },

    onSubmit: function( event ) {
        var integration = this.getIntegrationValue();

        integration.chat.provider = this.props.tokens.getConnectedChatProvider();
        integration.chat.token = this.props.tokens.get( integration.chat.provider );

        this.props.integrations.create( integration, function() {
            this.props.notices.add( 'Successfully created an integration' );
        }.bind( this ) );

        this.setState({
            isComplete: true
        });

        this.props.router.setRoute( '/configure/' + integration._id );

        event.preventDefault();
    },

    onConfirmationFieldClick: function( event ) {
        event.target.select();
    },

    render: function() {
        var integration = this.getIntegrationValue(),
            canSubmit = integration.chat.contact,
            classes;

        classes = classNames( 'configure', 'configure-manual', {
            'is-complete': this.state.isComplete
        });

        return (
            <div className={ classes }>
                <form onSubmit={ this.onSubmit } className="configure__form">
                    <ol className="configure__steps">
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
                        Continue
                    </button>
                    <ConfigureDetails integration={ this.props.integration } />
                </form>
            </div>
        );
    }
});
