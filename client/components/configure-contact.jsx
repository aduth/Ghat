var React = require( 'react/addons' );

module.exports = React.createClass({
    displayName: 'ConfigureEvent',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        contacts: React.PropTypes.arrayOf( React.PropTypes.shape({
            name: React.PropTypes.string,
            id: React.PropTypes.string,
            type: React.PropTypes.string
        }) ),
        onValueChanged: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            contacts: [],
            onValueChanged: function() {}
        };
    },

    getDefaultOption: function() {
        return { name: '' };
    },

    getOptions: function() {
        return [ this.getDefaultOption() ].concat( this.props.contacts ).map(function( contact ) {
            return <option key={ contact.id } value={ contact.id }>{ contact.name }</option>;
        });
    },

    onSelectedOptionChanged: function( event ) {
        this.props.onValueChanged( this.props.name, event.target.value );
    },

    render: function() {
        return (
            <label className="form-option">
                <p className="form-option__description">
                    Finally, choose who is to be notified from the list of available contacts for your chat provider.
                </p>
                <span className="form-option__label">Choose a contact:</span>
                <select onChange={ this.onSelectedOptionChanged }>{ this.getOptions() }</select>
            </label>
        );
    }
});
