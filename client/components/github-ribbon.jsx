var React = require( 'react' ),
    constants = require( '../../shared/constants/' );

module.exports = React.createClass({
    displayName: 'GitHubRibbon',

    render: function() {
        return (
            <div className="github-fork-ribbon-wrapper right">
                <div className="github-fork-ribbon">
                    <a href={ constants.app.GITHUB_REPO_URL }>Fork me on GitHub</a>
                </div>
            </div>
        );
    }
});
