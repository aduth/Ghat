var React = require( 'react/addons' );

module.exports = React.createClass({
    displayName: 'TabsList',

    getNavigationElements: function() {
        return React.Children.map( this.props.children, function( child ) {
            var classes = React.addons.classSet({
                'tabs-list__navigation-item': true,
                active: child.props.active
            }), style = { width: ( 100 / this.props.children.length ) + '%' };

            return (
                <li key={ child.props.name } className={ classes } style={ style }>
                    <a className="tabs-list__navigation-link" href={ child.props.href }>
                        { child.props.name }
                    </a>
                </li>
            );
        }, this );
    },

    getActiveContentElement: function() {
        var content;

        React.Children.forEach( this.props.children, function( child ) {
            if ( child.props.active ) {
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
