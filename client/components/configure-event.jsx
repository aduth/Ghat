var React = require( 'react/addons' );

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
            return <option key={ event.event } value={ event.event }>{ event.description }</option>;
        });
    },

    onSelectedOptionChanged: function( event ) {
        this.props.onValueChanged( this.props.name, event.target.value );
    },

    render: function() {
        return (
            <label className="form-option">
                <p className="form-option__description">To configure an integration, you must first choose a GitHub event to monitor.</p>
                <span className="form-option__label">Choose an event:</span>
                <select onChange={ this.onSelectedOptionChanged }>{ this.getOptions() }</select>
            </label>
        );
    }
});
