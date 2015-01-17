var React = require( 'react' ),
    Header = require( './header' ),
    Steps = require( './steps' );

module.exports = React.createClass({
    displayName: 'App',

    propTypes: {
        stores: React.PropTypes.object.isRequired
    },

    render: function() {
        return (
            <div className="app__container">
                <Header />
                <main className="app__content">
                    <Steps stores={ this.props.stores } />
                </main>
            </div>
        );
    }
});
