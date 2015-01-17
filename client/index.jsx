var React = require( 'react' ),
    App = require( './components/app' ),
    tokenObserver = require( './observers/token' ),
    constants = require( '../shared/constants/' ),
    stores = require( './stores/' );

/**
 * Bootstrap application
 */
tokenObserver.listen();

/**
 * Render base application element
 */
React.render(
    <App stores={ {
        token: new stores.Token(),
        avatar: new stores.Avatar(),
        contact: new stores.Contact(),
        repository: new stores.Repository(),
    } } />,
    document.getElementById( constants.elements.CONTAINER )
);
