var expect = require( 'chai' ).expect,
    nock = require( 'nock' ),
    users = require( '../../../fixtures/responses/slack/users.list' ),
    channels = require( '../../../fixtures/responses/slack/channels.list' ),
    groups = require( '../../../fixtures/responses/slack/groups.list' ),
    slack = require( '../../../../shared/integrations/slack' ),
    map = require( 'lodash/collection/map' );

describe( 'slack', function() {
    describe( '#getContacts()', function() {
        after(function() {
            nock.cleanAll();
        });

        it( 'should retrieve a sorted list of users, channels, and groups', function( done ) {
            nock( 'https://slack.com' )
                .get( '/api/users.list?token=' )
                .reply( 200, users );

            nock( 'https://slack.com' )
                .get( '/api/channels.list?token=' )
                .reply( 200, channels );

            nock( 'https://slack.com' )
                .get( '/api/groups.list?token=' )
                .reply( 200, groups );

            slack.getContacts( '', function( err, data ) {
                var names = map( data, 'name' );

                expect( names ).to.eql([
                    '#general',
                    '#my-private-group',
                    '#random',
                    '@aduth'
                ]);

                done();
            });
        });
    });
});
