var React = require( 'react/addons' ),
    config = require( '../../shared/config' );

module.exports = React.createClass({
    displayName: 'ConfigureDetails',

    propTypes: {
        integration: React.PropTypes.object
    },

    getDefaultProps: function() {
        return {
            integration: {}
        };
    },

    onInputClick: function( event ) {
        event.target.select();
    },

    render: function() {
        var url = config.origin + '/api/event/?integration_id=' + this.props.integration._id;

        return (
            <footer className="configure-details">
                <header>
                    <h3 className="configure-details__heading">Webhook Details</h3>
                    <p className="configure-details__description">
                        To complete the integration, create a webhook at your GitHub repository with the following details.
                        Webhooks are managed from the “Webhooks & Services” tab on a repository's settings page.
                    </p>
                </header>
                <fieldset className="configure-details__fields">
                    <label className="configure-details__field">
                        <span className="configure-details__label">Payload URL</span>
                        <input type="text" className="configure-details__input input" value={ url } onClick={ this.onInputClick } readOnly={ true } />
                    </label>
                    <label className="configure-details__field">
                        <span className="configure-details__label">Content type</span>
                        <input type="text" className="configure-details__input input" value="application/json" onClick={ this.onInputClick } readOnly={ true } />
                    </label>
                    <label className="configure-details__field">
                        <span className="configure-details__label">Secret</span>
                        <input type="text" className="configure-details__input input" value={ this.props.integration.secret } onClick={ this.onInputClick } readOnly={ true } />
                    </label>
                </fieldset>
            </footer>
        );
    }
});
