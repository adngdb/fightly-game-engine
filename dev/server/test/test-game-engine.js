var sys = require('sys'),
    ge = require('../lib/game-engine.js');

exports['log'] = function (test) {
    sys.log("Test");
    var wge = new ge.WGE();
    wge.start();
    test.done();
};
