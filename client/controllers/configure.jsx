var React = require( 'react' ),
    Configure = require( '../components/configure' ),
    TabsList = require( '../components/tabs-list' ),
    TabsPanel = require( '../components/tabs-panel' ),
    helpers = require( '../helpers/' ),
    constants = require( '../../shared/constants/' );

module.exports.create = function() {
    React.render(
        <TabsList defaultActive="My Integrations">
            <TabsPanel name="My Integrations" href="/"></TabsPanel>
            <TabsPanel name="Create New Integration" href="/configure" active={ true }>
                <Configure
                    tokens={ helpers.stores.getSingletonInstance( 'Token' ) }
                    contacts={ helpers.stores.getSingletonInstance( 'Contact' ) }
                    repositories={ helpers.stores.getSingletonInstance( 'Repository' ) }
                    hooks={ helpers.stores.getSingletonInstance( 'Hook' ) }
                    integrations={ helpers.stores.getSingletonInstance( 'Integration' ) } />
            </TabsPanel>
        </TabsList>,
        document.getElementById( constants.elements.CONTENT )
    );
};

module.exports.edit = function() {
    React.render(
        <TabsList>
            <TabsPanel name="My Integrations" href="/"></TabsPanel>
            <TabsPanel name="Create New Integration" href="/configure" active={ true }>
                <Configure
                    tokens={ helpers.stores.getSingletonInstance( 'Token' ) }
                    contacts={ helpers.stores.getSingletonInstance( 'Contact' ) }
                    repositories={ helpers.stores.getSingletonInstance( 'Repository' ) }
                    hooks={ helpers.stores.getSingletonInstance( 'Hook' ) }
                    integrations={ helpers.stores.getSingletonInstance( 'Integration' ) } />
            </TabsPanel>
        </TabsList>,
        document.getElementById( constants.elements.CONTENT )
    );
};

