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
    'util',
    'vendor/component-entity/component-entity-manager',
    'vendor/action-manager/action-manager',
    'lib/microevent',
], function (
    network, util, cem, am, microevent
) {
    "use strict";

    function Fightly(config) {
        cem.ComponentEntityManager.call(this);
        am.ActionManager.call(this);

        this.config = config;

        // modules asynchronous loading
        this.loading = 0;
        this.loaded = 0;
    }

    util.inherit(Fightly, cem.ComponentEntityManager);
    util.inherit(Fightly, am.ActionManager);

    // Make it an event emitter / listener
    microevent.mixin(Fightly);

    Fightly.prototype.init = function () {
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

        this.on('modules-loaded', function () {
            //!TODO
        });
    };

    Fightly.prototype.loadModules = function (modules) {
        var self = this;

        this.loading = 0;
        function moduleLoaded() {
            self.loaded++;
            if (self.loading === self.loaded) {
                self.emit('modules-loaded');
            }
        }

        for (var moduleName in modules) {
            var module = modules[moduleName];
            for (var i in module) {
                var file = module[i];
                this.loading++;

                if (file === "actions.js") {
                    this.loadActions(file, moduleName, moduleLoaded);
                } else {
                    this.loadComponent(file, moduleName, moduleLoaded);
                }
            }
        }
    };

    Fightly.prototype.loadActions = function (file, moduleName, callback) {
        var self = this;

        // load the actions of a given module
        var fileUrl = this.config.modules.baseUrl + moduleName + "/" + file;
        require([fileUrl], function (actions) {
            self.addActions(moduleName, actions.actions);

            if (callback) {
                callback();
            }
        });
    };

    Fightly.prototype.loadComponent = function (file, moduleName, callback) {
        var self = this;

        // load a component of a given module
        var fileUrl = this.config.modules.baseUrl + moduleName + "/" + file;
        require([fileUrl], function (components) {
            for (var c in components) {
                self.c(c, components[c]);
            }

            if (callback) {
                callback();
            }
        });
    };

    return Fightly;
});
