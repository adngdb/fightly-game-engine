/**
 * Test cases for core.GameEngine class.
 *
 * Requires node.js and it's nodeunit module.
 * To run those tests: nodeunit tests
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */

var GameEngine = require('../../lib/core/game-engine');


exports['inherits'] = function (test) {
    var myGE = new GameEngine();

    test.ok(typeof myGE.get == 'function');
    test.ok(typeof myGE.addComponent == 'function');
    test.ok(typeof myGE.createEntity == 'function');
    test.ok(typeof myGE.loadActions == 'function');
    test.ok(typeof myGE.actions == 'object');

    test.done();
}

exports['init'] = function (test) {
    var myGE = new GameEngine();

    test.done();
}

exports['create-game'] = function (test) {
    var myGE = new GameEngine();

    test.done();
}
