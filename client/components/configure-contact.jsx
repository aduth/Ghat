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
                    Choose the channel or contact to whom the messages should be delivered.
                </p>
                <label className="form-option">
                    <span className="form-option__label">Choose a contact:</span>
                    <Select
                        value={ this.props.value }
                        onChange={ this.props.onValueChanged }
                        options={ this.getOptions() }
                        searchable={ true } />
                </label>
            </li>
        );
    }
});
