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

    var Fightly = function (config) {
        this.config = config;
    };

    // Make it an event emitter / listener
    microevent.mixin(Fightly);

    Fightly.prototype.init = function () {
        this.cem = new cem.ComponentEntityManager();
        this.am = new am.ActionManager();

        // create network connection
        this.server = new network.ComManager(this.config.network, this);

        // start listening for events
        this.listen();
    };

    Fightly.prototype.listen = function () {
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

    Fightly.prototype.loadModules = function (modules) {
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

    Fightly.prototype.loadActions = function (file, moduleName) {
        var self = this;

        // load the actions of a given module
        var fileUrl = this.config.modules.baseUrl + moduleName + "/" + file;
        require([fileUrl], function (actions) {
            self.am.addActions(moduleName, actions);
        });
    };

    Fightly.prototype.loadComponent = function (file, moduleName) {
        var self = this;

        // load a component of a given module
        var fileUrl = this.config.modules.baseUrl + moduleName + "/" + file;
        require([fileUrl], function (components) {
            for (var c in components) {
                self.cem.c(c, components[c]);
            }
        });
    };

    return Fightly;
});
