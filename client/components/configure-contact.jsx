var React = require( 'react' ),
    Select = require( './select' );

module.exports = React.createClass({
    displayName: 'ConfigureEvent',

    propTypes: {
        contacts: React.PropTypes.arrayOf( React.PropTypes.shape({
            name: React.PropTypes.string,
            id: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number ]),
            type: React.PropTypes.string
        }) ),
        value: React.PropTypes.string,
        onValueChanged: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            contacts: Object.freeze([]),
            onValueChanged: function() {}
        };
    },

    getOptions: function() {
        return this.props.contacts.map(function( contact ) {
            return { value: contact.id, label: contact.name };
        });
    },

    render: function() {
        return (
            <li className="configure-contact">
                <p className="form-option__description">
                    Finally, choose who is to be notified from the list of available contacts for your chat provider.
                </p>
                <label className="form-option">
                    <span className="form-option__label">Choose a contact:</span>
                    <Select value={ this.props.value } onChange={ this.props.onValueChanged } options={ this.getOptions() } />
                </label>
            </li>
        );
    }
});
