/* ****************************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 *****************************************************************************/

var Game = require('../lib/game');

exports['test inheritance works'] = function (test) {
    var game = new Game(0);

    // ComponentEntityManager
    test.equal(typeof game.get, 'function');
    test.equal(typeof game.addComponent, 'function');
    test.equal(typeof game.createEntity, 'function');

    // ActionManager
    test.equal(typeof game.addActions, 'function');
    test.equal(typeof game.actions, 'object');

    // EventEmitter
    test.equal(typeof game.addListener, 'function');

    test.done();
};

exports['test a new entity can be created'] = function (test) {
    var game = new Game(0);
    game.c('Player', {});

    var player = game.e('Player');
    test.ok(player);

    test.done();
}
