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

    render: function() {
        return (
            <li className="configure-event">
                <label className="form-option">
                    <p className="form-option__description">To configure an integration, you must first choose a GitHub event to monitor.</p>
                    <span className="form-option__label">Choose an event:</span>
                    <Select onChange={ this.props.onValueChanged.bind( null, this.props.name ) } options={ this.getOptions() } includeDefault={ false } />
                </label>
            </li>
        );
    }
});
