var React = require( 'react/addons' );

module.exports = React.createClass({
    displayName: 'TabsList',

    propTypes: {
        defaultActive: React.PropTypes.string
    },

    getInitialState: function() {
        return { active: null };
    },

    setActive: function( name ) {
        this.setState({ active: name });
    },

    getNavigationElements: function() {
        return React.Children.map( this.props.children, function( child ) {
            var classes = React.addons.classSet({
                'tabs-list__navigation-item': true,
                active: child.props.name === ( this.state.active || this.props.defaultActive )
            }), style = { width: ( 100 / this.props.children.length ) + '%' };

            return (
                <li key={ child.props.name } className={ classes } onClick={ this.setActive.bind( null, child.props.name ) } style={ style }>
                    { child.props.name }
                </li>
            );
        }, this );
    },

    getActiveContentElement: function() {
        var content;

        React.Children.forEach( this.props.children, function( child ) {
            if ( child.props.name === ( this.state.active || this.props.defaultActive ) ) {
                content = child.props.children;
            }
        }, this );

        return content;
    },

    render: function() {
        return (
            <div className="tabs-list">
                <ul className="tabs-list__navigation">
                    { this.getNavigationElements() }
                </ul>
                <div key="content" className="tabs-list__content">
                    { this.getActiveContentElement() }
                </div>
            </div>
        );
    }
});
