/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

define([
    'network',
    'vendor/component-entity/component-entity-manager',
    'vendor/action-manager/action-manager',
    'lib/microevent',
], function (
    network, cem, am, microevent
) {
    "use strict";

    function is_null(variable) {
        return variable === null || typeof variable === 'undefined';
    }

    var F = function (config) {
        this.config = config;
    };

    // Make it an event emitter / listener
    microevent.mixin(F);

    F.prototype.init = function () {
        var self = this;

        this.cem = new cem.ComponentEntityManager();
        this.am = new am.ActionManager();

        // create network connection
        this.server = new network.ComManager(this.config.network, this);

        // start listening for events
        this.listen();
    };

    F.prototype.listen = function () {
        var self = this;

        this.on('connection', function () {
            // Require modules list from the server when we first connect
            self.server.data('modules');
        });

        this.on('data', function (data) {
            if (data.hasOwnProperty('modules')) {
                self.loadModules(data.modules);
            }
        });
    };

    F.prototype.loadModules = function (modules) {
        for (var moduleName in modules) {
            var module = modules[moduleName];
            for (var i in module) {
                var file = module[i];
                if (file === "actions.js") {
                    this.loadActions(file, moduleName);
                } else {
                    this.loadComponent(file, moduleName);
                }
            }
        }
    };

    F.prototype.loadActions = function (file, moduleName) {
        var self = this;

        // load the actions of a given module
        var fileUrl = this.config.modules.baseUrl + moduleName + "/" + file;
        require([fileUrl], function (actions) {
            self.am.addActions(moduleName, actions);
        });
    };

    F.prototype.loadComponent = function (file, moduleName) {
        var self = this;

        // load a component of a given module
        var fileUrl = this.config.modules.baseUrl + moduleName + "/" + file;
        require([fileUrl], function (components) {
            for (var c in components) {
                self.cem.c(c, components[c]);
            }
        });
    };

    return F;
});
