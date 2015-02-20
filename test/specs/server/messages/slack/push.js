var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/push' ),
    generateMessage = require( '../../../../../server/messages/slack/push' );

describe( 'messages/slack/push', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message.fallback ).to.equal( '[baxterthehacker/public-repo] 1 new commit by baxterthehacker' );
        expect( message.pretext ).to.equal( '[baxterthehacker/public-repo] 1 new commit by baxterthehacker:' );
        expect( message.text ).to.equal( '<https://github.com/baxterthehacker/public-repo/commit/7700ca29dd050d9adacc0803f866d9b539513535|7700ca2>: Trigger pages build' );
    });

    it( 'should generate the expected message for multiple commits', function() {
        var copy = JSON.parse( JSON.stringify( payload ) ),
            message;

        copy.commits = copy.commits.concat( copy.commits );
        message = generateMessage( copy );

        expect( message.fallback ).to.equal( '[baxterthehacker/public-repo] 2 new commits by baxterthehacker' );
        expect( message.pretext ).to.equal( '[baxterthehacker/public-repo] 2 new commits by baxterthehacker:' );
        expect( message.text ).to.equal(
            '<https://github.com/baxterthehacker/public-repo/commit/7700ca29dd050d9adacc0803f866d9b539513535|7700ca2>: Trigger pages build\n' +
            '<https://github.com/baxterthehacker/public-repo/commit/7700ca29dd050d9adacc0803f866d9b539513535|7700ca2>: Trigger pages build'
        );
    });
});
