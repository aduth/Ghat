var React = require( 'react/addons' ),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    stores = require( '../stores/' ),
    mixins = require( '../mixins/' );

module.exports = React.createClass({
    displayName: 'Notices',

    mixins: [
        mixins.eventMonitor( 'notices', 'change', 'setExpiration' )
    ],

    propTypes: {
        notices: React.PropTypes.instanceOf( stores.Notice ).isRequired,
        visibleTimeMilliseconds: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            visibleTimeMilliseconds: 5000
        };
    },

    getInitialState: function() {
        return {
            timeouts: []
        };
    },

    componentWillUnmount: function() {
        this.clearAllTimeouts();
    },

    clearAllTimeouts: function() {
        this.state.timeouts.forEach( clearTimeout );
    },

    setExpiration: function() {
        var timeouts = this.props.notices.get().map(function( notice ) {
            return setTimeout(
                this.props.notices.removeValue.bind( this.props.notices, notice ),
                notice.timestamp + this.props.visibleTimeMilliseconds - Date.now()
            );
        }, this );

        this.clearAllTimeouts();
        this.setState({
            timeouts: timeouts
        });
    },

    getNoticeElements: function() {
        return this.props.notices.get().map(function( notice ) {
            return (
                <li key={ notice.timestamp } className={ 'notices__notice is-' + notice.type } onClick={ this.props.notices.removeValue.bind( this.props.notices, notice ) }>
                    { notice.message }
                </li>
            );
        }, this );
    },

    render: function() {
        return (
            <ul className="notices">
                <ReactCSSTransitionGroup transitionName="notice__transition">
                    { this.getNoticeElements() }
                </ReactCSSTransitionGroup>
            </ul>
        );
    }
});
