/**
 * Test cases for core.GameEngine class.
 *
 * Requires node.js and it's nodeunit module.
 * To run those tests: nodeunit tests
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
var path = require('path');

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

exports['get-modules-list'] = function (test) {
    var myGE = new GameEngine(),
        pathToModules = 'tests/modules',
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
    var myGE = new GameEngine(),
        pathToModules = 'tests/modules';

    myGE._loadModulesComponents(pathToModules);

    var compList = myGE.getComponentsList();
    test.equal(typeof compList, 'object');
    test.notEqual(compList.indexOf('Position'), -1);
    test.notEqual(compList.indexOf('Cell'), -1);
    test.notEqual(compList.indexOf('Map'), -1);
    test.notEqual(compList.indexOf('Unit'), -1);

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
