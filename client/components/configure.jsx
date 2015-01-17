var React = require( 'react/addons' ),
    ConfigureEvent = require( './configure-event' ),
    integrations = require( '../../shared/integrations/' );

module.exports = React.createClass({
    displayName: 'Configure',

    getInitialState: function() {
        return { values: {} };
    },

    propTypes: {
        disabled: React.PropTypes.bool
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
                    </form>
                    <aside className="configure__disabled-content">
                        You must complete the authorization steps above before creating an integration.
                    </aside>
                </div>
            </div>
        );
    }
});
