var React = require( 'react' ),
    Integrations = require( '../components/integrations' ),
    TabsList = require( '../components/tabs-list' ),
    TabsPanel = require( '../components/tabs-panel' ),
    helpers = require( '../helpers/' ),
    constants = require( '../../shared/constants/' );

module.exports.index = function() {
    React.render(
        <TabsList>
            <TabsPanel name="My Integrations" href="/" active={ true }>
                <Integrations
                    tokens={ helpers.stores.getSingletonInstance( 'Token' ) }
                    integrations={ helpers.stores.getSingletonInstance( 'Integration' ) } />
            </TabsPanel>
            <TabsPanel name="Create New Integration" href="/configure"></TabsPanel>
        </TabsList>,
        document.getElementById( constants.elements.CONTENT )
    );
};
