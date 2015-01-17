var React = require( 'react' ),
    Header = require( './header' );

module.exports = React.createClass({
    displayName: 'App',

    render: function() {
        return (
            <div className="app__container">
                <Header />
                <main id="primary-content" className="app__content" />
            </div>
        );
    }
});
