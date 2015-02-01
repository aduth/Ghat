require( 'dotenv' ).load();

module.exports = {
    origin: process.env.ORIGIN || 'http://localhost:3000',
    port: process.env.PORT || 3000,
    github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    },
    slack: {
        clientId: process.env.SLACK_CLIENT_ID,
        clientSecret: process.env.SLACK_CLIENT_SECRET
    },
    mongodb: {
        uri: process.env.MONGOLAB_URI || process.env.MONGODB_URI || 'mongodb://localhost/ghat'
    },
    security: {
        secretLength: process.env.SECRET_LENGTH || 32
    },
    chat: {
        username: process.env.CHAT_USERNAME || 'Ghat Bot',
        avatar: ( process.env.ORIGIN || 'http://localhost:3000' ) + '/images/logo-128-small.png'
    }
};
