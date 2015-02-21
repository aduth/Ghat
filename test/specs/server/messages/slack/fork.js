var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/fork' ),
    generateMessage = require( '../../../../../server/messages/slack/fork' );

describe( 'fork', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message.fallback ).to.equal( '[baxterthehacker/public-repo] Repository forked by baxterandthehackers - baxterandthehackers/public-repo' );
        expect( message.pretext ).to.equal( '[baxterthehacker/public-repo] Repository forked by baxterandthehackers' );
        expect( message.title ).to.equal( 'baxterandthehackers/public-repo' );
        expect( message.title_link ).to.equal( 'https://github.com/baxterandthehackers/public-repo' );
    });
});
