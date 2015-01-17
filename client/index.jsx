var React = require( 'react' ),
    App = require( './components/app' ),
    tokenObserver = require( './observers/token' ),
    constants = require( '../shared/constants/' ),
    stores = require( './stores/' ),
    tokenStore = new stores.Token();

/**
 * Bootstrap application
 */
tokenObserver.listen( tokenStore );

/**
 * Render base application element
 */
React.render(
    <App stores={ {
        token: tokenStore,
        avatar: new stores.Avatar(),
        contact: new stores.Contact(),
        repository: new stores.Repository()
    } } />,
    document.getElementById( constants.elements.CONTAINER )
);
