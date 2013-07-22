// Runs client unit tests for Fightly

requirejs.config({
    baseUrl: '../src',
    paths: {
        'lib': '../lib',
        'config': '../config',
        'vendor': '../../vendor',
        'tests': '../tests',
        'mocha': '../node_modules/mocha/mocha',
        'chai': '../tests/libs/chai',
    },
});

require(['require', 'chai', 'mocha'], function(require, chai) {
    /*globals mocha */
    mocha.setup('bdd');

    require([
        'tests/test_fightly',
    ], function(require) {
        mocha.run();
    });

});
