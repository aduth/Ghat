var React = require( 'react/addons' );

module.exports = React.createClass({
    displayName: 'TabsList',

    propTypes: {
        defaultActive: React.PropTypes.string
    },

    getNavigationElements: function() {
        return React.Children.map( this.props.children, function( child ) {
            var classes = React.addons.classSet({
                'tabs-list__navigation-item': true,
                'is-active': child.props.active
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

    getChildContentElements: function() {
        var isActiveSet;

        React.Children.forEach( this.props.children, function( child ) {
            isActiveSet = isActiveSet || child.props.active;
        });

        return React.Children.map( this.props.children, function( child ) {
            var classes = React.addons.classSet({
                'tabs-list__child-content': true,
                'is-active': isActiveSet ? child.props.active : this.props.defaultActive === child.props.name
            });

            return <div key={ child.props.name } className={ classes }>{ child }</div>;
        }, this );
    },

    render: function() {
        return (
            <div className="tabs-list">
                <ul className="tabs-list__navigation">
                    { this.getNavigationElements() }
                </ul>
                <div className="tabs-list__content">
                    { this.getChildContentElements() }
                </div>
            </div>
        );
    }
});
