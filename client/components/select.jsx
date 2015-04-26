var React = require( 'react' ),
    Select = require( 'react-select' ),
    omit = require( 'lodash/object/omit' );

module.exports = React.createClass({
    displayName: 'Select',

    propTypes: {
        value: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number ]),
        onChange: React.PropTypes.func,
        options: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf( React.PropTypes.shape({
                value: React.PropTypes.string,
                label: React.PropTypes.string
            }) ),
            React.PropTypes.arrayOf( React.PropTypes.string )
        ]),
        searchable: React.PropTypes.bool,
        clearable: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        placeholder: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            onChange: function() {},
            options: Object.freeze([]),
            searchable: false,
            clearable: false,
            disabled: false,
            placeholder: ''
        };
    },

    getOptions: function() {
        return this.props.options.map(function( option ) {
            if ( 'string' === typeof option ) {
                return {
                    value: option,
                    label: option
                };
            } else {
                return option;
            }
        });
    },

    render: function() {
        var transferredProps = omit( this.props, 'options' );

        return <Select options={ this.getOptions() } { ...transferredProps } />;
    }
});
