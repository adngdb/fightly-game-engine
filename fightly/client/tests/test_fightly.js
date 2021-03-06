/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

define(function (require) {
    var chai = require('chai');
    var expect = chai.expect;
    //var assert = chai.assert;
    //var should = chai.should();

    var fightly = require('fightly');
    var config = {
        network: {
            host: 'localhost',
            port: 123456
        },
        modules: {
            baseUrl: '../../modules/'
        }
    }

    describe('Fightly', function () {

        describe('#Fightly()', function () {
            it('should have config', function () {
                var F = new fightly(config);
                expect(F.config.network.host).to.equal('localhost');
            });

            it('should have emitter methods', function () {
                var F = new fightly(config);
                expect(F.emit).to.exist;
                expect(F.on).to.exist;
                expect(F.off).to.exist;
            });

            it('should have ActionManager methods', function () {
                var F = new fightly(config);
                expect(F.addActions).to.exist;
                expect(F.actions).to.exist;
            });

            it('should have ComponentEntityManager methods', function () {
                var F = new fightly(config);
                expect(F.c).to.exist;
                expect(F.addComponent).to.exist;
                expect(F.e).to.exist;
                expect(F.createEntity).to.exist;
                expect(F.get).to.exist;
            });

            it('should be able to create an entity', function () {
                var F = new fightly(config);
                F.c('Fake', {});

                var entity = F.e('Fake');
                expect(entity).to.exist;
                expect(F.get('Fake')).to.exist;
                expect(F.get('Fake').length).to.equal(1);
            });
        });

        describe('#listen()', function () {
            it('should be able to receive a "connection" event', function () {
                var F = new fightly(config);
                var count = 0;


                // mock the server's data() method to increase counter
                F.server.data = function () {
                    count++;
                };

                F.emit('connection');
                expect(count).to.equal(2);

                F.emit('connection');
                expect(count).to.equal(4);
            });

            it('should be able to receive a "data" event', function () {
                var F = new fightly(config);
                var data = [];


                // mock the engine's loadModules() method to increase counter
                F.loadModules = function (d) {
                    data.push(d);
                };

                F.emit('data', {modules: '12'});
                expect(data).to.have.length(1);
                expect(data[0]).to.equal('12');

                F.emit('data', {modules: {a: 13}});
                expect(data).to.have.length(2);
                expect(data[1]).to.deep.equal({a: 13});
            });

            it('should be able to receive an identity', function () {
                var F = new fightly(config);

                F.emit('data', {identity: {id: 42}});
                expect(F.identity).to.exist;
                expect(F.identity.id).to.equal(42);
            });
        });

        describe('#loadModules()', function () {
            it('should load modules', function (done) {
                var F = new fightly(config);

                var modules = {
                    core: [
                        'actions.js',
                        'game.js',
                        'player.js',
                    ]
                };
                F.emit('data', { 'modules': modules });

                F.on('modulesLoaded', function () {
                    // actions
                    expect(F.actions).to.exist;
                    expect(F.actions.core).to.exist;
                    expect(F.actions.core.joinGame).to.exist;

                    // test calling an action
                    var action = null;
                    F.server.action = function (act) {
                        action = act;
                    }
                    F.actions.core.createGame({id: 1});

                    expect(action).to.deep.equal({
                        module: 'core',
                        name: 'createGame',
                        args: [1]
                    });

                    // components
                    expect(F.getComponentsList().sort()).to.deep.equal(['obj', 'Game', 'Player'].sort());

                    done();
                });
            });
        });

        describe('#updateEntity()', function () {
            it('should create a new entity', function (done) {
                var F = new fightly(config);

                var modules = {
                    core: [
                        'actions.js',
                        'game.js',
                        'player.js',
                    ]
                };
                F.emit('data', { 'modules': modules });
                F.emit('data', { 'games': [] });

                F.on('ready', function() {
                    expect(F.get('Player')).to.not.exist;

                    var newEntity = {
                        'id': 42,
                        'type': ['obj', 'Player'],
                        'game': null
                    }
                    F.updateEntity(newEntity);

                    expect(F.get(42)).to.exist;
                    expect(F.get('Player')).to.exist;
                    expect(F.get('Player').length).to.equal(1);

                    done();
                });
            });

            it('should update the values of an entity', function (done) {
                var F = new fightly(config);

                var modules = {
                    core: [
                        'actions.js',
                        'game.js',
                        'player.js',
                    ]
                };
                F.emit('data', { 'modules': modules });
                F.emit('data', { 'games': [] });

                F.on('ready', function() {
                    var player = F.e('Player');
                    expect(F.get('Player').length).to.equal(1);
                    expect(player.game).to.not.exist;

                    var newEntity = {
                        'id': player.id,
                        'type': ['obj', 'Player'],
                        'game': 12345
                    }
                    F.updateEntity(newEntity);

                    expect(F.get(player.id)).to.exist;
                    expect(F.get('Player').length).to.equal(1);

                    expect(player.game).to.equal(12345);

                    done();
                });
            });
        });

        describe('events', function () {
            it('should emit the "ready" event', function (done) {
                var F = new fightly(config);

                var modules = {
                    core: [
                        'actions.js',
                        'game.js',
                        'player.js',
                    ]
                };
                F.emit('data', { 'modules': modules });
                F.emit('data', { 'games': [] });

                F.on('ready', function() {
                    done();
                });
            });

            it('should emit the "ready" event only once', function (done) {
                var F = new fightly(config);
                var readyCount = 0;
                var gamesCount = 0;

                var modules = {
                    core: [
                        'actions.js',
                        'game.js',
                        'player.js',
                    ]
                };

                F.on('ready', function() {
                    readyCount++;
                    F.emit('data', { 'games': [] });
                });

                F.on('gamesUpdated', function() {
                    gamesCount++;
                    if (gamesCount === 3) {
                        expect(readyCount).to.equal(1);
                        done();
                    }
                    else if (gamesCount === 2) {
                        F.emit('data', { 'games': [] });
                    }
                });

                F.emit('data', { 'modules': modules });
                F.emit('data', { 'games': [] });
            });
        });
    });
});
