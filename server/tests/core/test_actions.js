/**
 * Test cases for core.GameEngine class.
 *
 * Requires node.js and it's nodeunit module.
 * To run those tests: nodeunit tests
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
var path = require('path'),
    util = require('util');

var GameEngine = require('../../lib/game-engine');


exports['join-game'] = function (test) {
    var myGE = new GameEngine();
    myGE._loadCoreActions()
        ._loadCoreComponents();

    var g = myGE.e('Game'),
        p = myGE.e('Player');

    util.log(util.inspect(myGE.actions.core.joinGame));

    test.ok(myGE.actions.core.joinGame(g, p));

    test.equal(g.players.length, 1);

    test.done();
}

exports['next-turn'] = function (test) {
    var myGE = new GameEngine();
    myGE._loadCoreActions()
        ._loadCoreComponents();

    var g = myGE.e('Game'),
        p = myGE.e('Player');

    g.players
    g.currentPlayer = p;

    test.equal(typeof g, 'object');
    test.equal(g.currentTurn, 0);

    test.ok(myGE.actions.core.nextTurn(g, p));

    test.equal(g.currentTurn, 1);

    test.done();
}
