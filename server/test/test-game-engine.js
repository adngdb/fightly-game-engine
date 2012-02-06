var sys = require('sys'),
    gameEngine_ = require('../lib/game-engine.js');

exports['log'] = function (test) {
    sys.log("Test");
    var ge = new gameEngine_.GameEngine();
    ge.start();
    test.done();
};
