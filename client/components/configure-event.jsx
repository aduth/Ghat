var React = require( 'react' ),
    Select = require( './select' );

module.exports = React.createClass({
    displayName: 'ConfigureEvent',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        events: React.PropTypes.arrayOf( React.PropTypes.shape({
            event: React.PropTypes.string,
            description: React.PropTypes.string
        }) ),
        onValueChanged: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            events: [],
            onValueChanged: function() {}
        };
    },

    getOptions: function() {
        return this.props.events.map(function( event ) {
            return { value: event.event, label: event.description };
        });
    },

    onSelectedOptionChanged: function( domEvent ) {
        this.props.onValueChanged( this.props.name, domEvent.target.value );
    },

    render: function() {
        return (
            <label className="form-option">
                <p className="form-option__description">To configure an integration, you must first choose a GitHub event to monitor.</p>
                <span className="form-option__label">Choose an event:</span>
            </label>
                <Select onChange={ this.onSelectedOptionChanged } options={ this.getOptions() } includeDefault={ false } />
        );
    }
});
