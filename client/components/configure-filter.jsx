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
            operators: React.PropTypes.arrayOf( React.PropTypes.string ),
            options: React.PropTypes.arrayOf( React.PropTypes.string ),
            events: React.PropTypes.arrayOf( React.PropTypes.string )
        }) ),
        value: React.PropTypes.shape({
            field: React.PropTypes.string,
            operator: React.PropTypes.string,
            value: React.PropTypes.string
        }),
        onValueChanged: React.PropTypes.func,
        onRemove: React.PropTypes.func
    },

    componentDidUpdate: function() {
        if ( this.props.value.field && ! this.getCurrentFilter() ) {
            this.onValueChanged({});
        }
    },

    getInitialState: function() {
        return { isCustom: false };
    },

    getDefaultProps: function() {
        return {
            filters: Object.freeze([]),
            value: Object.freeze({}),
            onValueChanged: function() {},
            onRemove: function() {}
        };
    },

    getFieldOptions: function() {
        return this.props.filters.map(function( filter ) {
            return { value: filter.field, label: filter.description };
        });
    },

    getCurrentFilter: function() {
        var field = this.state.isCustom ? 'custom' : this.props.value.field;

        if ( field ) {
            return find( this.props.filters, { field: field });
        }
    },

    getOperatorOptions: function() {
        var filter = this.getCurrentFilter();

        if ( filter ) {
            return filter.operators || [ '=' ];
        }
    },

    onChange: function( field, value ) {
        var fieldValuePair = {};
        fieldValuePair[ field ] = value;
        this.props.onValueChanged( assign({}, this.props.value, fieldValuePair ) );
    },

    onInputChange: function( field, event ) {
        this.onChange( field, event.target.value );
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
            return <input type="text" value={ this.props.value.field } onChange={ this.onInputChange.bind( null, 'field' ) } placeholder="e.g. user.login" className="input" />;
        } else {
            return <Select options={ this.getFieldOptions() } value={ this.props.value.field } onChange={ this.onFieldChange } />;
        }
    },

    getValueInput: function() {
        var filter = this.getCurrentFilter();

        if ( filter && filter.options ) {
            return <Select options={ filter.options } value={ this.props.value.value } onChange={ this.onChange.bind( null, 'value' ) } />;
        } else {
            return <input type="text" value={ this.props.value.value } disabled={ ! this.props.value.field } onChange={ this.onInputChange.bind( this, 'value' ) } className="input" />;
        }
    },

    render: function() {
        return (
            <tr className="configure-filter">
                <td width="40%">{ this.getFieldInput() }</td>
                <td width="20%">
                    <Select options={ this.getOperatorOptions() } includeDefault={ false } disabled={ ! this.props.value.field } value={ this.props.value.operator } onChange={ this.onChange.bind( this, 'operator' ) } />
                </td>
                <td width="35%">{ this.getValueInput() }</td>
                <td width="15%">
                    <button type="button" onClick={ this.props.onRemove } className="icon-button">
                        <span className="fa fa-remove" />
                        <span className="visually-hidden">Remove</span>
                    </button>
                </td>
            </tr>
        );
    }
});
