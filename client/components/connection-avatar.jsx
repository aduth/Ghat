var React = require( 'react' ),
    mixins = require( '../mixins/' ),
    stores = require( '../stores/' );

module.exports = React.createClass({
    displayName: 'ConnectionAvatar',

    mixins: [
        mixins.observeStore([ 'tokens', 'profiles' ])
    ],

    propTypes: {
        provider: React.PropTypes.string,
        profiles: React.PropTypes.instanceOf( stores.Profile ).isRequired,
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        onDisconnect: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            onDisconnect: function() {}
        };
    },

    getAvatarImageElement: function() {
        var profile = this.props.profiles.get( this.props.provider, this.props.tokens.get( this.props.provider ) );

        if ( profile ) {
            return <img width="100" height="100" src={ profile.avatar } alt="User avatar" className="connection-avatar__image" />;
        } else {
            return <span className="connection-avatar__mystery-user fa fa-user" />;
        }
    },

    render: function() {
        return (
            <button className="connection-avatar" onClick={ this.props.onDisconnect }>
                <span className="fa fa-remove connection-avatar__disconnect-icon"></span>
                <span className="visually-hidden">Disconnect</span>
                { this.getAvatarImageElement() }
            </button>
        );
    }
});
