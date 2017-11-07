var conditioner = require('conditioner-core/conditioner-core.js');

// apply custom settings
conditioner.addPlugin({

    // converts module aliases to paths
    moduleSetName: function(name) { return './ui/' + name + '.js' },

    // setup AMD require
    moduleImport: function(name) {
        return new Promise(function(resolve) {
            resolve( require(name) );
        });
    }

});

// lets go!
conditioner.hydrate( document.documentElement );