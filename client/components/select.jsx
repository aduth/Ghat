var React = require( 'react' );

module.exports = React.createClass({
    displayName: 'Select',

    propTypes: {
        value: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number ]),
        onChange: React.PropTypes.func,
        includeDefault: React.PropTypes.bool,
        options: React.PropTypes.array,
        disabled: React.PropTypes.bool
    },

    componentDidMount: function() {
        if ( ! this.props.includeDefault && this.props.options.length && ! this.props.value ) {
            this.setDefaultValue( this.props );
        }
    },

    componentWillUpdate: function( nextProps ) {
        if ( ! nextProps.includeDefault && nextProps.options.length && ! nextProps.value ) {
            this.setDefaultValue( nextProps );
        }
    },

    setDefaultValue: function( props ) {
        props.onChange( 'object' === typeof props.options[0] ? props.options[0].value : props.options[0] );
    },

    getDefaultProps: function() {
        return {
            onChange: function() {},
            includeDefault: true,
            options: Object.freeze([]),
            disabled: false
        };
    },

    getOptions: function() {
        var options = this.props.options;

        if ( this.props.includeDefault ) {
            options = [{ value: '', name: '' }].concat( options );
        }

        return options.map(function( option ) {
            if ( 'object' === typeof option ) {
                return <option key={ option.value } value={ option.value }>{ option.label }</option>;
            } else {
                return <option key={ option } value={ option }>{ option }</option>;
            }
        });
    },

    onSelectedValueChanged: function( domEvent ) {
        this.props.onChange( domEvent.target.value );
    },

    render: function() {
        return (
            <div className="select">
                <select className="select__input" value={ this.props.value } onChange={ this.onSelectedValueChanged } disabled={ this.props.disabled }>
                    { this.getOptions() }
                </select>
                <span className="fa fa-caret-down select__expand" />
            </div>
        );
    }
});
