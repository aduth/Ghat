var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/push' ),
    generateMessage = require( '../../../../../server/messages/common/push' );

describe( 'push', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message ).to.equal( '[baxterthehacker/public-repo] 1 new commit by baxterthehacker' );
    });

    it( 'should generate the expected message for multiple commits', function() {
        var copy = JSON.parse( JSON.stringify( payload ) ),
            message;

        copy.commits = copy.commits.concat( copy.commits );
        message = generateMessage( copy );

        expect( message ).to.equal( '[baxterthehacker/public-repo] 2 new commits by baxterthehacker' );
    });

    it( 'should not generate a message if no commits exist', function() {
        var copy = JSON.parse( JSON.stringify( payload ) ),
            message;

        copy.commits = [];
        message = generateMessage( copy );

        expect( message ).to.be.undefined;
    });
});
