/**
 * Test cases for core actions.
 *
 * Requires node.js and its nodeunit module.
 * To run those tests: ./runtests
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
var path = require('path'),
    util = require('util'),
    config = require('config');

var GameEngine = require('../../lib/game-engine');


exports['join-game'] = function (test) {
    var myGE = new GameEngine(config.core);
    myGE.init();

    var g = myGE.e('Game'),
        p = myGE.e('Player');

    util.log(util.inspect(myGE.actions.core.joinGame));

    test.ok(myGE.actions.core.joinGame(g, p));

    test.equal(g.players.length, 1);

    test.done();
}

exports['next-turn'] = function (test) {
    var myGE = new GameEngine(config.core);
    myGE.init();

    var g = myGE.e('Game'),
        p = myGE.e('Player');

    g.players.push(p);
    g.activePlayer = p;
    p.inGame = g;

    test.equal(typeof g, 'object');
    test.equal(g.currentTurn, 0);

    test.ok(myGE.actions.core.nextTurn(g, p));

    test.equal(g.currentTurn, 1);

    test.done();
}
