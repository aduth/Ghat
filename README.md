![Ghat](./public/images/logo.png)

[![Build Status](https://travis-ci.org/aduth/Ghat.svg?branch=master)](https://travis-ci.org/aduth/Ghat)

Ghat sends messages to your favorite chat service when actions are taken at a GitHub repository, helping you to keep up-to-date with the latest events. A variety of chat services are supported, and filtering options allow you to selectively choose which types of messages are sent.

Currently, the following chat services are supported:

- [Slack](https://slack.com/)
- [Gitter](https://gitter.im)

## Try it now!

To host your own instance, easily deploy to your Heroku account using the button below:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/aduth/ghat)

## Development

Before starting, the following will need to be installed and available:

- [Node.js](http://nodejs.org/)
- [MongoDB](http://www.mongodb.org/)

After cloning the repository, install Node and Bower dependencies using `npm install`. Before running the web server, create the first build by running `npm build`. Finally, start the web server with `npm start`.

The entire process is illustrated below:

```bash
$ git clone https://github.com/aduth/Ghat.git
$ cd Ghat
$ npm install
$ npm build
$ npm start
```

The following environment variables are used, and can be specified by creating a `.env` file in the root directory.

- `NODE_ENV`: The running mode of the environment: `production` or `development` (default: `development`)
- `ORIGIN`: The root URL of your hosted application (default: `http://localhost:3000`)
- `PORT`: The port on which the application runs (default: `3000`)
- `HOMEBASE`: Boolean indicating whether application should display with official branding (default: `false`)
- `MONGODB_URI`: URI to the running instance of MongoDB (default: `mongodb://localhost/ghat`)
- `CHAT_USERNAME`: The username of the chat bot (default: `Ghat Bot`)
- `GITHUB_CLIENT_ID`: The client ID for your registered GitHub application (required)
- `GITHUB_CLIENT_SECRET`: The client secret for your registered GitHub application (required)
- `SLACK_CLIENT_ID`: The client ID for your registered Slack application (required)
- `SLACK_CLIENT_SECRET`: The client secret for your registered Slack application (required)
- `GITTER_CLIENT_ID`: The client ID for your registered Gitter application (required)
- `GITTER_CLIENT_SECRET`: The client secret for your registered Gitter application (required)

The following npm scripts are available:

- `npm run build`: Builds stylesheet and JavaScript source files and moves vendor assets to public directory
- `npm run dev`: Executes the build task, then watches files for changes, triggering a build on change
- `npm run start`: Starts the web server, listening on the port defined by the `PORT` environment variable
- `npm run test`: Runs Mocha test suite

More specific [Gulp](http://gulpjs.com/) build tasks are defined tasks in [gulpfile.js](./gulpfile.js).

## Security

Since account access is granted through Ghat, security is a very important consideration. The following decisions have been made to limit the amount of access needed by the application:

- GitHub webhooks can be managed manually without granting access to your account
- Ghat uses the more-permissive `repo` GitHub API scope instead of `write:repo_hook` because otherwise it's not possible to create webhooks for private repositories.
- GitHub tokens are only ever available as plain-text in the client browser. When saving an integration, GitHub tokens are stored as a non-readable [bcrypt hash](http://en.wikipedia.org/wiki/Bcrypt) to be used in future verification for managing existing integrations.
- Slack tokens are scoped to the minimum required capabilities, which excludes the ability to read messages from your Slack channels

If you still have concerns, it's very easy to host your own private instance of Ghat by clicking the Heroku Deploy button above.

## License

The MIT License (MIT)

Copyright (c) 2015 Andrew Duthie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
