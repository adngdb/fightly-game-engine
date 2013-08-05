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

    var messager = require('messager');
    var Emitter = require('lib/microevent');

    describe('Messager', function () {
        describe('#parse()', function () {
            it('should parse a "modules data" message', function () {
                var emitter = new Emitter();
                var M = new messager.Messager(emitter);
                var msg = {
                    'modules': [
                        'alpha',
                        'beta'
                    ]
                }

                var data = null;
                emitter.on('modulesData', function (modules) {
                    data = modules;
                });
                M.parse(msg);
                expect(data).to.deep.equal(['alpha', 'beta']);
            });
        });

        describe('#action()', function () {
            it('should create action objects as expected', function () {
                var M = new messager.Messager();
                var res = M.action('alpha', 'beta', [{'id': 1}, {'id': 42}]);
                expect(res).to.deep.equal({
                    module: 'alpha',
                    name: 'beta',
                    args: [1, 42]
                });
            });
        });
    });
});
