var expect = require( 'chai' ).expect,
    nock = require( 'nock' ),
    response = require( '../../../fixtures/responses/repos' ),
    github = require( '../../../../shared/integrations/github' );

describe( 'github', function() {
    describe( '#getNextPageFromheaders()', function() {
        it( 'should return undefined if no headers exists', function() {
            var page = github.getNextPageFromheaders();

            expect( page ).to.be.undefined;
        });

        it( 'should return undefined if no link header exists', function() {
            var page = github.getNextPageFromheaders({ notLink: '' });

            expect( page ).to.be.undefined;
        });

        it( 'should return undefined if a link header doesn\'t include the next page', function() {
            var page = github.getNextPageFromheaders({
                link: '<https://api.github.com/user/repos?page=1>; rel="prev"'
            });

            expect( page ).to.be.undefined;
        });

        it( 'should return the next page for a valid link header', function() {
            var page = github.getNextPageFromheaders({
                link: '<https://api.github.com/user/repos?page=2>; rel="next", <https://api.github.com/user/repos?page=1>; rel="prev"'
            });

            expect( page ).to.be.equal( 2 );
        });
    });

    describe( '#hasMorePages()', function() {
        it( 'should return true if a link header exists with the next page', function() {
            var hasMorePages = github.hasMorePages({
                headers: {
                    link: '<https://api.github.com/user/repos?page=2>; rel="next", <https://api.github.com/user/repos?page=1>; rel="prev"'
                }
            });

            expect( hasMorePages ).to.be.true;
        });

        it( 'should return false if no more pages exist', function() {
            var hasMorePages = github.hasMorePages({
                headers: {}
            });

            expect( hasMorePages ).to.be.false;
        });
    });

    describe( '#getRepositories()', function() {
        it( 'should retrieve user repositories', function( done ) {
            nock( 'https://api.github.com' )
                .get( '/user/repos?per_page=100' )
                .reply( 200, response );

            github.getRepositories( '', function( err, data, hasMorePages ) {
                expect( hasMorePages ).to.be.false;
                expect( data ).to.eql( response );

                nock.cleanAll();
                done();
            });
        });

        it( 'should continue to retrieve paged data', function( done ) {
            var secondPass;

            nock( 'https://api.github.com' )
                .get( '/user/repos?per_page=100' )
                .reply( 200, response, {
                    Link: '<https://api.github.com/user/repos?page=2>; rel="next", <https://api.github.com/user/repos?page=1>; rel="prev"'
                });

            nock( 'https://api.github.com' )
                .get( '/user/repos?page=2&per_page=100' )
                .reply( 200, response );

            github.getRepositories( '', function( err, data, hasMorePages ) {
                if ( secondPass ) {
                    expect( hasMorePages ).to.be.false;
                    expect( data ).to.eql( response.concat( response ) );

                    nock.cleanAll();
                    done();
                } else {
                    expect( hasMorePages ).to.be.true;
                    expect( data ).to.eql( response );
                    secondPass = true;
                }
            });
        });
    });
});
