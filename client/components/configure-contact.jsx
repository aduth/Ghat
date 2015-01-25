var React = require( 'react' ),
    Select = require( './select' );

module.exports = React.createClass({
    displayName: 'ConfigureEvent',

    propTypes: {
        name: React.PropTypes.string.isRequired,
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
            contacts: [],
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
                <label className="form-option">
                    <p className="form-option__description">
                        Finally, choose who is to be notified from the list of available contacts for your chat provider.
                    </p>
                    <span className="form-option__label">Choose a contact:</span>
                    <Select value={ this.props.value } onChange={ this.props.onValueChanged.bind( null, this.props.name ) } options={ this.getOptions() } />
                </label>
            </li>
        );
    }
});
