var React = require( 'react' );

module.exports = React.createClass({
    displayName: 'TabsPanel',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        href: React.PropTypes.string,
        active: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            active: false
        };
    },

    render: function() {
        return (
            <div className="tabs-panel">{ this.props.children }</div>
        );
    }
});
