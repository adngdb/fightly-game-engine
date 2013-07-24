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

    var g = myGE.e('Game');
    var p1 = myGE.e('Player');
    var p2 = myGE.e('Player');
    var p3 = myGE.e('Player');

    test.equal(g.players.length, 0);

    test.ok(myGE.actions.core.joinGame(g, p1));
    test.equal(g.players.length, 1);

    test.ok(myGE.actions.core.joinGame(g, p2));
    test.equal(g.players.length, 2);

    // Test the maximum number of players cannot be passed
    test.ok(!myGE.actions.core.joinGame(g, p3));
    test.equal(g.players.length, 2);

    test.done();
}

exports['next-turn'] = function (test) {
    var myGE = new GameEngine(config.core);
    myGE.init();

    var g = myGE.e('Game');
    var p1 = myGE.e('Player');
    var p2 = myGE.e('Player');

    g.players.push(p1);
    g.players.push(p2);
    g.activePlayer = p1;
    p1.inGame = p2.inGame = g;

    test.equal(g.currentTurn, 0);

    test.ok(myGE.actions.core.nextTurn(g, p1));
    test.equal(g.currentTurn, 1);
    test.equal(g.activePlayer.id, p2.id);

    test.done();
}
