var React = require( 'react' );

module.exports = React.createClass({
    displayName: 'TabsPanel',

    propTypes: {
        name: React.PropTypes.string
    },

    render: function() {
        return (
            <div className="tabs-panel">{ this.props.children }</div>
        );
    }
});
