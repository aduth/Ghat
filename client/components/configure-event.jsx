var React = require( 'react' ),
    MultiCheckbox = require( './multi-checkbox' );

module.exports = React.createClass({
    displayName: 'ConfigureEvent',

    propTypes: {
        events: React.PropTypes.object,
        value: React.PropTypes.arrayOf( React.PropTypes.string ),
        onValueChanged: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            events: Object.freeze({}),
            onValueChanged: function() {}
        };
    },

    selectAll: function() {
        this.props.onValueChanged( Object.keys( this.props.events ) );
    },

    getOptions: function() {
        return Object.keys( this.props.events ).map(function( event ) {
            return {
                value: event,
                label: this.props.events[ event ]
            };
        }, this );
    },

    render: function() {
        return (
            <li className="configure-event">
                <p className="form-option__description">First choose the GitHub events to monitor.</p>
                <span className="form-option__label">
                    Choose events:
                    <button type="button" className="configure-event__select-all button is-plain" onClick={ this.selectAll }>(Select All)</button>
                </span>
                <MultiCheckbox checked={ this.props.value } onChange={ this.props.onValueChanged } options={ this.getOptions() } />
            </li>
        );
    }
});
