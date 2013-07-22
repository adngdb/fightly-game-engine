define(function (require) {
    var chai = require('chai');
    //var assert = chai.assert;
    var expect = chai.expect;
    //var should = chai.should();

    var fightly = require('fightly');
    var config = {
        network: {
            host: 'localhost',
            port: 8001
        }
    }

    describe('Fightly', function () {
        describe('#loadConfig()', function () {
            it('should load configuration', function () {
                var F = new fightly(config);
                expect(F.config.network.host).to.equal('localhost');
            });
        });
    });

});
