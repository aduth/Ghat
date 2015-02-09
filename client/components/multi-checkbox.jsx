var React = require( 'react' ),
    without = require( 'lodash/array/without' ),
    omit = require( 'lodash/object/omit' );

module.exports = React.createClass({
    displayName: 'MultiCheckbox',

    propTypes: {
        checked: React.PropTypes.array,
        options: React.PropTypes.arrayOf( React.PropTypes.shape({
            value: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.number
            ]),
            label: React.PropTypes.string
        }) ),
        onChange: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            checked: Object.freeze([]),
            options: Object.freeze([]),
            onChange: function() {}
        };
    },

    handleChange: function( event ) {
        var value;

        if ( event.target.checked ) {
            value = this.props.checked.concat( event.target.value );
        } else {
            value = without( this.props.checked, event.target.value );
        }

        this.props.onChange( value );
        event.stopPropagation();
    },

    getCheckboxElements: function() {
        return this.props.options.map(function( option ) {
            var isChecked = this.props.checked.indexOf( option.value ) !== -1;

            return (
                <label key={ option.value } className="multi-checkbox__label">
                    <input
                        type="checkbox"
                        value={ option.value }
                        checked={ isChecked }
                        onChange={ this.handleChange }
                        disabled={ this.props.disabled }
                        className="multi-checkbox__option" />
                    { option.label }
                </label>
            );
        }, this );
    },

    render: function() {
        var classes = 'multi-checkbox ' + ( this.props.className || '' );

        return (
            <div className={ classes } { ...omit( this.props, 'checked', 'onChange', 'className' ) }>
                { this.getCheckboxElements() }
            </div>
        );
    }
});
