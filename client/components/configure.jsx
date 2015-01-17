var React = require( 'react/addons' );

module.exports = React.createClass({
    displayName: 'Configure',

    propTypes: {
        disabled: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return { disabled: true };
    },

    onSubmit: function() {
        return false;
    },

    render: function() {
        var classes = React.addons.classSet({
            configure: true,
            disabled: this.props.disabled
        });

        return (
            <form onSubmit={ this.onSubmit } className={ classes }>
                <div className="configure__content" />
            </form>
        );
    }
});
