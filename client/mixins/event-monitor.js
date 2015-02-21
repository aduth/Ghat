module.exports = function( props, event, handler ) {
    // Normalize props to array
    if ( ! Array.isArray( props ) ) {
        props = [ props ];
    }

    return {
        componentDidMount: function() {
            var handlerFunction = this[ handler ];

            props.forEach(function( prop ) {
                if ( this.props[ prop ] ) {
                    this.props[ prop ].on( event, handlerFunction );
                }
            }, this );
        },

        componentDidUpdate: function( prevProps ) {
            var handlerFunction = this[ handler ];

            props.forEach(function( prop ) {
                if ( prevProps[ prop ] === this.props[ prop ] ) {
                    return;
                }

                if ( prevProps[ prop ] ) {
                    prevProps[ prop ].removeListener( event, handlerFunction );
                }

                if ( this.props[ prop ] ) {
                    this.props[ prop ].on( event, handlerFunction );
                }
            }, this );
        },

        componentWillUnmount: function() {
            var handlerFunction = this[ handler ];

            props.forEach(function( prop ) {
                if ( this.props[ prop ] ) {
                    this.props[ prop ].removeListener( event, handlerFunction );
                }
            }, this );
        }
    };
};
