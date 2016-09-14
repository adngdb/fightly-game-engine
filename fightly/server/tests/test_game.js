/* ****************************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 *****************************************************************************/

var Game = require('../src/game');

exports['test inheritance works'] = function (test) {
    var game = new Game(0);

    // ComponentEntityManager
    test.equal(typeof game.manager.addComponent, 'function');
    test.equal(typeof game.manager.createEntity, 'function');

    // ActionManager
    test.equal(typeof game.actions.addActions, 'function');
    test.equal(typeof game.actions.actions, 'object');

    // EventEmitter
    test.equal(typeof game.addListener, 'function');

    test.done();
};

exports['test a new entity can be created'] = function (test) {
    var game = new Game(0);
    game.manager.addComponent('Player', {});

    var player = game.manager.createEntity(['Player']);
    test.ok(player === 0);

    test.done();
}

exports['test an `entityComponentUpdated` event sends a message to all clients'] = function (test) {
    var game = new Game(0);
    game.manager.addComponent('Player', {});

    var count = 0;
    function send() {
        count++;
    }

    var p1 = game.manager.createEntity(['Player']);
    var c1 = {
        'send': send
    }
    game.addClient(p1, c1);

    var p2 = game.manager.createEntity(['Player']);
    var c2 = {
        'send': send
    }
    game.addClient(p2, c2);

    var p3 = game.manager.createEntity(['Player']);
    var c3 = {
        'send': send
    }
    game.addClient(p3, c3);

    game.emit('entityComponentUpdated', 0, {});
    test.equal(count, 3);

    test.done();
}
