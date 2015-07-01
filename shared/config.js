if ( ! process.browser && 'production' !== process.env.NODE_ENV ) {
    require( 'dotenv' ).load( {
        silent: true
    } );
}

module.exports = {
    origin: process.env.ORIGIN || 'http://localhost:3000',
    port: process.env.PORT || 3000,
    homebase: process.env.HOMEBASE || false,
    github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    },
    slack: {
        clientId: process.env.SLACK_CLIENT_ID,
        clientSecret: process.env.SLACK_CLIENT_SECRET
    },
    gitter: {
        clientId: process.env.GITTER_CLIENT_ID,
        clientSecret: process.env.GITTER_CLIENT_SECRET
    },
    mongodb: {
        uri: process.env.MONGOLAB_URI || process.env.MONGODB_URI || 'mongodb://localhost/ghat'
    },
    security: {
        bcryptWorkFactor: process.env.BCRYPT_WORK_FACTOR || 10,
        secretLength: process.env.SECRET_LENGTH || 32
    },
    chat: {
        username: process.env.CHAT_USERNAME || 'Ghat Bot',
        avatar: ( process.env.ORIGIN || 'http://localhost:3000' ) + '/images/logo-128-small.png'
    }
};
