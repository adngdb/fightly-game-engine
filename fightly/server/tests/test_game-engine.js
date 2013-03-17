/**
 * Test cases for core.GameEngine class.
 *
 * Requires node.js and it's nodeunit module.
 * To run those tests: nodeunit tests
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
var path = require('path'),
    config = require('config');

var GameEngine = require('../lib/game-engine');

exports['inherits'] = function (test) {
    var myGE = new GameEngine(config);

    // ComponentEntityManager
    test.equal(typeof myGE.get, 'function');
    test.equal(typeof myGE.addComponent, 'function');
    test.equal(typeof myGE.createEntity, 'function');

    // ActionManager
    test.equal(typeof myGE.addActions, 'function');
    test.equal(typeof myGE.actions, 'object');

    // EventEmitter
    test.equal(typeof myGE.addListener, 'function');

    test.done();
}

exports['get-modules'] = function (test) {
    var myGE = new GameEngine(config),
        modules = myGE.getModules(),
        modulesExpected;

    // there are 3 folders in tests/modules/
    test.equal(Object.keys(modules).length, 3);

    modulesExpected = {
        'core': ['actions.js', 'position.js'],
        'map': ['actions.js', 'cell.js', 'map.js'],
        'unit': ['actions.js', 'unit.js'],
    };
    test.deepEqual(modules, modulesExpected);

    test.done();
}

exports['get-modules-list'] = function (test) {
    var myGE = new GameEngine(config),
        pathToModules = config.modules.directory,
        modules = myGE._getModulesList(pathToModules),
        modulesExpected;

    test.ok(Array.isArray(modules));
    test.equal(modules.length, 3); // there are 3 folders in tests/modules/

    modulesExpected = [
        path.join(pathToModules, 'core'),
        path.join(pathToModules, 'map'),
        path.join(pathToModules, 'unit'),
    ];
    test.deepEqual(modules, modulesExpected);

    test.done();
}

exports['load-modules-components'] = function (test) {
    var myGE = new GameEngine(config),
        pathToModules = config.modules.directory,
        modules = myGE._getModulesList(pathToModules);

    myGE._loadModulesComponents(modules);

    var compList = myGE.getComponentsList();
    test.equal(typeof compList, 'object');
    test.notEqual(compList.indexOf('Position'), -1);
    test.notEqual(compList.indexOf('Cell'), -1);
    test.notEqual(compList.indexOf('Map'), -1);
    test.notEqual(compList.indexOf('Unit'), -1);

    // Test creating an entity
    var unit = myGE.e('Unit');

    test.equal(unit.life, 50);

    test.done();
}

exports['load-modules-actions'] = function (test) {
    var myGE = new GameEngine(config),
        pathToModules = config.modules.directory,
        modules = myGE._getModulesList(pathToModules);

    myGE._loadModulesActions(modules);

    var actions = myGE.actions;
    test.equal(typeof actions, 'object');
    test.equal(typeof actions.unit.move, 'function');
    test.equal(typeof actions.unit.attack, 'function');
    test.equal(typeof actions.unknown, 'undefined');

    test.done();
}

exports['load-core-components'] = function (test) {
    var myGE = new GameEngine(config),
        pathToModules = config.core.modules.directory,
        modules = myGE._getModulesList(pathToModules),
        g;

    myGE._loadModulesComponents(modules);

    var compList = myGE.getComponentsList();
    test.equal(typeof compList, 'object');
    test.notEqual(compList.indexOf('Game'), -1);

    test.doesNotThrow(function() { g = myGE.e('Game'); });

    test.equal(typeof g, 'object');
    test.equal(g.currentTurn, 0);

    test.done();
}

exports['load-core-actions'] = function (test) {
    var myGE = new GameEngine(config)
        pathToModules = config.core.modules.directory,
        modules = myGE._getModulesList(pathToModules);

    myGE._loadModulesActions(modules);

    var actions = myGE.actions;
    test.equal(typeof actions, 'object');
    test.equal(typeof actions.core.nextTurn, 'function');

    test.done();
}

exports['init'] = function (test) {
    var myGE = new GameEngine(config);
    myGE.init();

    test.equal(typeof myGE.actions, 'object');
    test.equal(typeof myGE.getComponentsList(), 'object');

    test.done();
}

exports['init-events-listeners'] = function (test) {
    var myGE = new GameEngine(config);

    myGE.init();

    var unit1 = myGE.e('Unit'),
        unit2 = myGE.e('Unit');

    test.equal(typeof myGE.actions.unit.attack, 'function');
    test.equal(unit1.life, 50);
    test.equal(unit2.life, 50);

    var receivedAction = {
            'action': {
                'module': 'unit',
                'name': 'attack',
                'args': [unit1.id, unit2.id]
            },
            'client': 1
        };

    myGE.emit('actionReceive', receivedAction);

    test.equal(unit1.life, 45);
    test.equal(unit2.life, 40);

    test.done();
}

exports['data-received-event'] = function (test) {
    var myGE = new GameEngine(config);
    var client = {
        call: 0,
        send: function () {
            this.call++;
        }
    };
    var dataReceived = {
        data: 'modules',
        client: client
    };

    myGE.init();
    myGE.emit('dataReceive', dataReceived);
    test.equal(client.call, 1);

    test.done();
}

exports['create-game'] = function (test) {
    var myGE = new GameEngine(config.core);
    myGE.init();

    var game = myGE.createGame();

    test.equal(game.currentTurn, 0);

    test.done();
}
