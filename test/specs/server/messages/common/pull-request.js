var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/pull-request' ),
    generateMessage = require( '../../../../../server/messages/common/pull-request' );

describe( 'pull-request', function() {
    it( 'should not generate a message for non-opened action if newly created', function() {
        var copy = JSON.parse( JSON.stringify( payload ) ),
            message;

        copy.action = 'assigned';
        copy.pull_request.created_at = new Date();
        message = generateMessage( copy );

        expect( message ).to.be.undefined;
    } );

    it( 'should generate a message for opened action if newly created', function() {
        var copy = JSON.parse( JSON.stringify( payload ) ),
            message;

        copy.pull_request.created_at = new Date();
        message = generateMessage( copy );

        expect( message ).to.not.be.undefined;
    } );

    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message ).to.equal( '[baxterthehacker/public-repo] Pull request opened by baxterthehacker - #50: Update the README with new information' );
    });
});
