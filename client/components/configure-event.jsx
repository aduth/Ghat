var React = require( 'react' ),
    MultiCheckbox = require( './multi-checkbox' );

module.exports = React.createClass({
    displayName: 'ConfigureEvent',

    propTypes: {
        events: React.PropTypes.arrayOf( React.PropTypes.shape({
            event: React.PropTypes.string,
            description: React.PropTypes.string
        }) ),
        value: React.PropTypes.arrayOf( React.PropTypes.string ),
        onValueChanged: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            events: Object.freeze([]),
            onValueChanged: function() {}
        };
    },

    getOptions: function() {
        return this.props.events.map(function( event ) {
            return {
                value: event.event,
                label: event.description
            };
        });
    },

    render: function() {
        return (
            <li className="configure-event">
                <label className="form-option">
                    <p className="form-option__description">First choose the GitHub events to monitor.</p>
                    <span className="form-option__label">Choose events:</span>
                    <MultiCheckbox checked={ this.props.value } onChange={ this.props.onValueChanged } options={ this.getOptions() } />
                </label>
            </li>
        );
    }
});
