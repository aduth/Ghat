var React = require( 'react' );

module.exports = React.createClass({
    displayName: 'Select',

    propTypes: {
        value: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number ]),
        onChange: React.PropTypes.func,
        includeDefault: React.PropTypes.oneOfType([ React.PropTypes.bool, React.PropTypes.string ]),
        options: React.PropTypes.array,
        disabled: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            onChange: function() {},
            includeDefault: true,
            options: Object.freeze([]),
            disabled: false
        };
    },

    getOptionValue: function( option ) {
        return 'object' === typeof option ? option.value : option;
    },

    getOptions: function() {
        var options = this.props.options,
            defaultLabel;

        // Include a default option unless explicitly disabled via a false
        // value. A true value will default the label to an empty string,
        // otherwise the string prop will be used.
        if ( false !== this.props.includeDefault ) {
            defaultLabel = true === this.props.includeDefault ? '' : this.props.includeDefault;
            options = [{ value: '', label: defaultLabel }].concat( options );
        }

        return options;
    },

    getOptionElements: function() {
        return this.getOptions().map(function( option ) {
            if ( 'object' === typeof option ) {
                return <option key={ option.value + option.label } value={ option.value }>{ option.label }</option>;
            } else {
                return <option key={ option } value={ option }>{ option }</option>;
            }
        });
    },

    onSelectedValueChanged: function( domEvent ) {
        this.props.onChange( domEvent.target.value );
    },

    render: function() {
        var value = this.props.value || this.getOptionValue( this.getOptions()[0] );

        return (
            <div className="select">
                <select className="select__input" value={ value } onChange={ this.onSelectedValueChanged } disabled={ this.props.disabled }>
                    { this.getOptionElements() }
                </select>
                <span className="fa fa-caret-down select__expand" />
            </div>
        );
    }
});
