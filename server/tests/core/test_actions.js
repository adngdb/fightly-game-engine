/**
 * Test cases for core.GameEngine class.
 *
 * Requires node.js and it's nodeunit module.
 * To run those tests: nodeunit tests
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
var path = require('path');

var GameEngine = require('../../lib/game-engine');


exports['next-turn'] = function (test) {
    var myGE = new GameEngine();
    myGE._loadCoreActions()._loadCoreComponents();

    var g = myGE.e('Game');

    test.equal(typeof g, 'object');
    test.equal(g.currentTurn, 0);

    test.ok(myGE.actions.core.nextTurn(g));

    test.equal(g.currentTurn, 1);

    test.done();
}
