var React = require( 'react' ),
    pluck = require( 'lodash/collection/pluck' ),
    Select = require( './select' );

module.exports = React.createClass({
    displayName: 'ConfigureRepository',

    propTypes: {
        repositories: React.PropTypes.arrayOf( React.PropTypes.shape({
            full_name: React.PropTypes.string,
            name: React.PropTypes.string
        }) ),
        value: React.PropTypes.string,
        onValueChanged: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            repositories: Object.freeze([]),
            onValueChanged: function() {}
        };
    },

    getOptions: function() {
        return pluck( this.props.repositories, 'full_name' );
    },

    render: function() {
        return (
            <li className="configure-repository">
                <p className="form-option__description">
                    Next, choose the GitHub repository to monitor.
                </p>
                <label className="form-option">
                    <span className="form-option__label">Choose a repository:</span>
                    <Select value={ this.props.value } onChange={ this.props.onValueChanged } options={ this.getOptions() } />
                </label>
            </li>
        );
    }
});
