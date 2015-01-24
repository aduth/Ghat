var React = require( 'react' );

module.exports = React.createClass({
    displayName: 'Select',

    propTypes: {
        onChange: React.PropTypes.func,
        includeDefault: React.PropTypes.bool,
        options: React.PropTypes.array
    },

    componentDidMount: function() {
        if ( ! this.includeDefault && this.props.options.length ) {
            this.props.onChange( this.props.options[0].value );
        }
    },

    getDefaultProps: function() {
        return {
            onChange: function() {},
            includeDefault: true,
            options: Object.freeze([])
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
                <select className="select__input" onChange={ this.onSelectedValueChanged }>{ this.getOptions() }</select>
                <span className="fa fa-caret-down select__expand" />
            </div>
        );
    }
});
