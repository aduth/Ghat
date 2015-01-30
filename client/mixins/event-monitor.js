module.exports = function( prop, event, handler ) {
    return {
        componentDidMount: function() {
            this.props[ prop ].on( event, this[ handler ] );
        },

        componentWillUnmount: function() {
            this.props[ prop ].removeListener( event, this[ handler ] );
        }
    };
};
