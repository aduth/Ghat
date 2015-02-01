var expect = require( 'chai' ).expect,
    ArrayStore = require( '../../../client/stores/array' );

describe( 'ArrayStore', function() {
    var store;
    beforeEach(function() {
        store = new ArrayStore();
    });

    describe( '#get()', function() {
        it( 'should return an array of all added values', function() {
            store.add( 1 );
            expect( store.get() ).to.eql([ 1 ]);
        });
    });

    describe( '#add()', function() {
        it( 'should add a value for future retrieval', function() {
            store.add( 1 );
            expect( store.get() ).to.eql([ 1 ]);
        });
    });

    describe( '#remove()', function() {
        it( 'should remove a value by index', function() {
            store.add( 1 );
            expect( store.get() ).to.eql([ 1 ]);
            store.remove( 0 );
            expect( store.get() ).to.eql([]);
        });
    });

    describe( '#removeValue()', function() {
        it( 'should remove a value by value', function() {
            store.add( 1 );
            expect( store.get() ).to.eql([ 1 ]);
            store.removeValue( 1 );
            expect( store.get() ).to.eql([]);
        });
    });
});
