var React = require( 'react/addons' );

module.exports = React.createClass({
    displayName: 'ConfigureRepository',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        repositories: React.PropTypes.arrayOf( React.PropTypes.shape({
            id: React.PropTypes.number,
            name: React.PropTypes.string
        }) ),
        onValueChanged: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            repositories: [],
            onValueChanged: function() {}
        };
    },

    getDefaultOption: function() {
        return { name: '' };
    },

    getOptions: function() {
        return [ this.getDefaultOption() ].concat( this.props.repositories ).map(function( repository ) {
            return <option key={ repository.id } value={ repository.id }>{ repository.name }</option>;
        });
    },

    onSelectedOptionChanged: function( domEvent ) {
        this.props.onValueChanged( this.props.name, domEvent.target.value );
    },

    render: function() {
        return (
            <label className="form-option">
                <p className="form-option__description">Next, choose the GitHub repository to monitor.</p>
                <span className="form-option__label">Choose a repository:</span>
                <select onChange={ this.onSelectedOptionChanged }>{ this.getOptions() }</select>
            </label>
        );
    }
});
