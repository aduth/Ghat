module.exports = {
    componentDidMount: function() {
        this.props.router.on( 'route', this.forceUpdateOnRoute );
    },

    componentWillUnmount: function() {
        this.props.router.removeEventListener( 'route', this.forceUpdateOnRoute );
    },

    forceUpdateOnRoute: function() {
        if ( this.isMounted() ) {
            this.forceUpdate();
        }
    }
};
