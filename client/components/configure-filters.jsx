var React = require( 'react' ),
    ConfigureFilter = require( './configure-filter' );

module.exports = React.createClass({
    displayName: 'ConfigureFilters',

    propTypes: {
        filters: React.PropTypes.arrayOf( React.PropTypes.shape({
            field: React.PropTypes.string,
            description: React.PropTypes.string,
            operators: React.PropTypes.arrayOf( React.PropTypes.string )
        }) ),
        onValueChanged: React.PropTypes.func,
        value: React.PropTypes.arrayOf( React.PropTypes.shape({
            field: React.PropTypes.string,
            operator: React.PropTypes.string,
            value: React.PropTypes.string
        }) )
    },

    getDefaultProps: function() {
        return {
            filters: Object.freeze([]),
            onValueChanged: function() {},
            value: Object.freeze([])
        };
    },

    getRows: function() {
        return this.props.value.map(function( filter, i ) {
            if ( filter ) {
                return (
                    <ConfigureFilter
                        key={ i }
                        filters={ this.props.filters }
                        value={ filter }
                        onValueChanged={ this.onFilterChanged.bind( this, i ) }
                        onRemove={ this.onFilterRemoved.bind( this, i ) } />
                );
            }
        }, this );
    },

    addRow: function() {
        var newValue = this.props.value.concat([{}]);
        this.props.onValueChanged( newValue );
    },

    onFilterChanged: function( rowIndex, value ) {
        var newValue = this.props.value.slice( 0 );
        newValue[ rowIndex ] = value;
        this.props.onValueChanged( newValue );
    },

    onFilterRemoved: function( rowIndex ) {
        var newValue = this.props.value.slice( 0 );
        newValue[ rowIndex ] = null;
        this.props.onValueChanged( newValue );
    },

    render: function() {
        return (
            <li className="configure-filters">
                <p className="form-option__description">
                    If you want to selectively choose the events to relay, add one or more filters. When creating a custom filter,
                    you may find it helpful to refer to <a href="https://developer.github.com/v3/activity/events/types/">GitHub's
                    Event Payload documentation</a>.
                </p>
                <table className="configure-filters__current">
                    <thead className="visually-hidden">
                        <tr>
                            <th>Field</th>
                            <th>Operator</th>
                            <th>Value</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>{ this.getRows() }</tbody>
                </table>
                <button type="button" className="form-option__add button" onClick={ this.addRow }>
                    <span className="fa fa-plus" />
                    Add a filter
                </button>
            </li>
        );
    }
});
