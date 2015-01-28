var React = require( 'react' ),
    assign = require( 'lodash/object/assign' ),
    find = require( 'lodash/collection/find' ),
    Select = require( './select' );

module.exports = React.createClass({
    displayName: 'ConfigureFilter',

    propTypes: {
        filters: React.PropTypes.arrayOf( React.PropTypes.shape({
            field: React.PropTypes.string,
            description: React.PropTypes.string,
            operators: React.PropTypes.arrayOf( React.PropTypes.string )
        }) ),
        value: React.PropTypes.shape({
            field: React.PropTypes.string,
            operator: React.PropTypes.string,
            value: React.PropTypes.string
        }),
        onValueChanged: React.PropTypes.func,
        onRemove: React.PropTypes.func
    },

    getInitialState: function() {
        return { isCustom: false };
    },

    getDefaultProps: function() {
        return { value: Object.freeze({}) };
    },

    getFieldOptions: function() {
        return this.props.filters.map(function( filter ) {
            return { value: filter.field, label: filter.description };
        });
    },

    getOperatorOptions: function() {
        var field, filter;

        if ( this.state.isCustom ) {
            field = 'custom';
        } else {
            field = this.props.value.field;
        }

        if ( field ) {
            filter = find( this.props.filters, { field: field });

            if ( filter ) {
                return filter.operators || [ '=' ];
            }
        }
    },

    onChange: function( field, value ) {
        var fieldValuePair = {},
            newValue;

        if ( value && value.constructor && 'SyntheticEvent' === value.constructor.name ) {
            value = value.target.value;
        }

        fieldValuePair[ field ] = value;
        newValue = assign({}, this.props.value, fieldValuePair );

        this.props.onValueChanged( newValue );
    },

    onFieldChange: function( value ) {
        if ( 'custom' === value ) {
            value = '';
            this.setState({ isCustom: true });
        }

        this.onChange( 'field', value );
    },

    getFieldInput: function() {
        if ( this.state.isCustom ) {
            return <input type="text" value={ this.props.value.field } onChange={ this.onChange.bind( null, 'field' ) } placeholder="e.g. user.login" className="input" />;
        } else {
            return <Select options={ this.getFieldOptions() } value={ this.props.value.field } onChange={ this.onFieldChange } />;
        }
    },

    render: function() {
        return (
            <tr className="configure-filter">
                <td width="40%">{ this.getFieldInput() }</td>
                <td width="20%">
                    <Select options={ this.getOperatorOptions() } includeDefault={ false } disabled={ ! this.props.value.field } value={ this.props.value.operator } onChange={ this.onChange.bind( this, 'operator' ) } />
                </td>
                <td width="35%">
                    <input type="text" value={ this.props.value.value } disabled={ ! this.props.value.field } onChange={ this.onChange.bind( this, 'value' ) } className="input" />
                </td>
                <td width="15%">
                    <button type="button" onClick={ this.props.onRemove } className="configure-filter__remove">
                        <span className="fa fa-remove" />
                        <span className="visually-hidden">Remove</span>
                    </button>
                </td>
            </tr>
        );
    }
});
