/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

define([
    'messager',
    'network',
    'util',
    'vendor/component-entity/component-entity-manager',
    'vendor/action-manager/action-manager',
    'lib/microevent',
], function (
    messager, network, util, cem, am, microevent
) {
    "use strict";

    function Fightly(config) {
        cem.ComponentEntityManager.call(this);
        am.ActionManager.call(this);

        this.config = config;

        // create network connection
        this.server = new network.ComManager(this.config.network, this);
        this.messager = new messager.Messager(this);

        // modules asynchronous loading
        this.loading = 0;
        this.loaded = 0;

        this.identity = null;

        // start listening for events
        this.listen();
    }

    util.inherit(Fightly, cem.ComponentEntityManager);
    util.inherit(Fightly, am.ActionManager);

    // Make it an event emitter / listener
    microevent.mixin(Fightly);

    Fightly.prototype.init = function () {
    };

    Fightly.prototype.listen = function () {
        var self = this;

        this.on('connection', function () {
            // Require modules list from the server when we first connect
            self.server.data('modules');
        });

        this.on('data', function (data) {
            self.messager.parse(data);
        });

        this.on('modulesData', function (modules) {
            self.loadModules(modules);
        });
        this.on('identityData', function (identity) {
            self.identity = identity;
        });

        this.on('modulesLoaded', function () {
            this.emit('ready');
        });
    };

    Fightly.prototype.loadModules = function (modules) {
        var self = this;

        this.loaded = 0;
        this.loading = 0;
        function moduleLoaded() {
            self.loaded++;
            if (self.loading === self.loaded) {
                self.emit('modulesLoaded');
            }
        }

        for (var moduleName in modules) {
            var module = modules[moduleName];
            var l = module.length;
            this.loading += l;

            for (var i = 0; i < l; i++) {
                var file = module[i];

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

        function execute() {
            self.server.action(
                self.messager.action(this.module, this.actionName, arguments)
            );
        }

        // load the actions of a given module
        var fileUrl = this.config.modules.baseUrl + moduleName + "/" + file;
        require([fileUrl], function (actions) {
            self.addActions(moduleName, actions.actions, execute);

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

    Fightly.prototype.createGame = function () {
        this.actions.core.createGame(this.identity);
    };

    return Fightly;
});
