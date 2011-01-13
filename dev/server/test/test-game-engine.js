var ge = require('../lib/game-engine.js');

exports['log'] = function (test) {
    ge.log("Test");
    var wge = new ge.WGE();
    wge.start();
    test.done();
};
