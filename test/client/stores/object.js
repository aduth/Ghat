var expect = require( 'chai' ).expect,
    ObjectStore = require( '../../../client/stores/object' );

describe( 'ObjectStore', function() {
    var store;
    beforeEach(function() {
        store = new ObjectStore();
    });

    describe( '#getAll()', function() {
        it( 'should return an object of all set values', function() {
            store.set( 'a', 1 );
            expect( store.getAll() ).to.eql({ a: 1 });
        });
    });

    describe( '#get()', function() {
        it( 'should return a single value by key', function() {
            store.set( 'a', 1 );
            expect( store.get( 'a' ) ).to.equal( 1 );
        });
    });

    describe( '#set()', function() {
        it( 'should save a value by key for future retrieval', function() {
            store.set( 'a', 1 );
            expect( store.get( 'a' ) ).to.equal( 1 );
        });
    });

    describe( '#remove()', function() {
        it( 'should remove a value by key', function() {
            store.set( 'a', 1 );
            expect( store.get( 'a' ) ).to.equal( 1 );
            store.remove( 'a' );
            expect( store.get( 'a' ) ).to.be.undefined;
        });
    });
});
