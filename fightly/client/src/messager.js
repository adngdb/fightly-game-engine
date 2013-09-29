/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

define(function () {
    "use strict";

    function Messager(listener) {
        this.listener = listener;
    }

    Messager.prototype.parse = function (message) {
        if (message.hasOwnProperty('modules')) {
            this.listener.emit('modulesData', message.modules);
        }
        else if (message.hasOwnProperty('identity')) {
            this.listener.emit('identityData', message.identity);
        }
        else if (message.hasOwnProperty('data')) {
            this.listener.emit('entityData', message.data);
        }
    };

    Messager.prototype.action = function (module, action, args) {
        var params = [];

        for (var i = 0, l = args.length; i < l; i++) {
            params.push(args[i].id);
        }

        return {
            'module': module,
            'name': action,
            'args': params
        };
    };

    return {
        'Messager': Messager
    };
});
