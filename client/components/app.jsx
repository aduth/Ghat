var React = require( 'react' ),
    Header = require( './header' ),
    Steps = require( './steps' ),
    stores = require( '../stores/' );

module.exports = React.createClass({
    displayName: 'App',

    render: function() {
        return (
            <div className="app__container">
                <Header />
                <main className="app__content">
                    <Steps stores={ stores } />
                </main>
            </div>
        );
    }
});
