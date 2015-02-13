var Router = require( 'director' ).Router,
    controllers = require( './controllers/' );

module.exports.start = function() {
    Router({
        '/': controllers.integrations.index,
        '/configure': controllers.configure.create,
        '/configure/:id': controllers.configure.edit
    }).configure({ html5history: true }).init();
};
