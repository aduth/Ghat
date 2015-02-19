var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/fork' ),
    generateMessage = require( '../../../../../server/messages/common/fork' );

describe( 'messages/common/fork', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message ).to.equal( '[baxterthehacker/public-repo] Repository forked by baxterandthehackers - baxterandthehackers/public-repo' );
    });
});
