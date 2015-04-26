var React = require( 'react' ),
    classNames = require( 'classnames' );

module.exports = React.createClass({
    displayName: 'TabsList',

    propTypes: {
        defaultActive: React.PropTypes.string
    },

    getNavigationElements: function() {
        return React.Children.map( this.props.children, function( child ) {
            var classes = classNames( 'tabs-list__navigation-item', {
                'is-active': child.props.active
            }), style = { width: ( 100 / this.props.children.length ) + '%' };

            return (
                <li key={ child.key } className={ classes } style={ style }>
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
            var classes = classNames( 'tabs-list__child-content', {
                'is-active': isActiveSet ? child.props.active : this.props.defaultActive === child.key
            });

            return <div key={ child.key } className={ classes }>{ child }</div>;
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
