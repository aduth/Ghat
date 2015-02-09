module.exports = function( props, event, handler ) {
    // Normalize props to array
    if ( ! Array.isArray( props ) ) {
        props = [ props ];
    }

    // Default event to `change`
    event = event || 'change';

    // Default handler to `forceUpdate`
    handler = handler || 'forceUpdate';

    return {
        componentDidMount: function() {
            props.forEach(function( prop ) {
                if ( this.props[ prop ] ) {
                    this.props[ prop ].on( event, Function.prototype.bind.call( this[ handler ], this ) );
                }
            }, this );
        },

        componentDidUpdate: function( prevProps ) {
            props.forEach(function( prop ) {
                if ( prevProps[ prop ] === this.props[ prop ] ) {
                    return;
                }

                if ( prevProps[ prop ] ) {
                    prevProps[ prop ].removeListener( event, Function.prototype.bind.call( this[ handler ], this ) );
                }

                if ( this.props[ prop ] ) {
                    this.props[ prop ].on( event, Function.prototype.bind.call( this[ handler ], this ) );
                }
            }, this );
        },

        componentWillUnmount: function() {
            props.forEach(function( prop ) {
                if ( this.props[ prop ] ) {
                    this.props[ prop ].removeListener( event, Function.prototype.bind.call( this[ handler ], this ) );
                }
            }, this );
        }
    };
};
