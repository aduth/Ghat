module.exports = function() {
    var properties = Array.prototype.slice.call( arguments );

    return {
        componentDidMount: function() {
            properties.forEach(function( property ) {
                if ( this.props[ property ] ) {
                    this.props[ property ].on( 'change', this.update );
                }
            }, this );
        },

        componentWillUnmount: function() {
            properties.forEach(function( property ) {
                if ( this.props[ property ] ) {
                    this.props[ property ].removeListener( 'change', this.update );
                }
            }, this );
        },

        componentDidUpdate: function( prevProps ) {
            properties.forEach(function( property ) {
                if ( prevProps[ property ] ) {
                    prevProps[ property ].removeListener( 'change', this.update );
                }

                if ( this.props[ property ] ) {
                    this.props[ property ].on( 'change', this.update );
                }
            }, this );
        },

        update: function() {
            if ( this.isMounted() ) {
                this.forceUpdate();
            }
        }
    };
};