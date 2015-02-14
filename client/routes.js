var controllers = require( './controllers/' );

module.exports = {
    '/': controllers.integrations.index,
    '/configure': controllers.configure.create,
    '/configure/:id': controllers.configure.edit
};
