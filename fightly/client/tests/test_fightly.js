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

            it('should have ComponentEntityManager methods', function () {
                var F = new fightly(config);
                expect(F.addActions).to.exist;
                expect(F.actions).to.exist;
            });

            it('should have ActionManager methods', function () {
                var F = new fightly(config);
                expect(F.c).to.exist;
                expect(F.addComponent).to.exist;
                expect(F.e).to.exist;
                expect(F.createEntity).to.exist;
                expect(F.get).to.exist;
            });
        });

        describe('#listen()', function () {
            it('should be able to receive a "connection" event', function () {
                var F = new fightly(config);
                var count = 0;

                F.init();

                // mock the server's data() method to increase counter
                F.server.data = function () {
                    count++;
                };

                F.emit('connection');
                expect(count).to.equal(1);

                F.emit('connection');
                expect(count).to.equal(2);
            });

            it('should be able to receive a "data" event', function () {
                var F = new fightly(config);
                var data = [];

                F.init();

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
                F.init();

                F.emit('data', {identity: {id: 42}});
                expect(F.identity).to.exist;
                expect(F.identity.id).to.equal(42);
            });
        });

        describe('#loadModules()', function () {
            it('should load modules', function (done) {
                var F = new fightly(config);
                F.init();

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
                    expect(F.getComponentsList()).to.deep.equal(['obj', 'Game', 'Player']);

                    done();
                });
            });
        });

        describe('events', function () {
            it('should emit the "ready" event', function (done) {
                var F = new fightly(config);
                F.init();

                var modules = {
                    core: [
                        'actions.js',
                        'game.js',
                        'player.js',
                    ]
                };
                F.emit('data', { 'modules': modules });

                F.on('ready', function() {
                    done();
                })
            });
        });
    });
});
