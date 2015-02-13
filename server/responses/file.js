module.exports = function( fileName ) {
    return {
        success: function( req, res, next ) {
            res.sendFile( fileName, {
                root: __dirname + '/../../public'
            });
        }
    };
};
