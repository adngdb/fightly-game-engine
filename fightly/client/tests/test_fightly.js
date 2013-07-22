define(function (require) {
    var chai = require('chai');
    var expect = chai.expect;
    //var assert = chai.assert;
    //var should = chai.should();

    var fightly = require('fightly');
    var config = {
        network: {
            host: 'localhost',
            port: 8001
        }
    }

    describe('Fightly', function () {
        it('should create correctly', function () {
            var F = new fightly(config);
            expect(F.config.network.host).to.equal('localhost');
        });

        it('should have emitter methods', function () {
            var F = new fightly(config);
            expect(F.emit).to.exist;
            expect(F.on).to.exist;
            expect(F.off).to.exist;
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
        });
    });

});
