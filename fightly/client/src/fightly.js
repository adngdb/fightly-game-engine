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

        // The engine should not be used until `this.ready` is true. A `ready`
        // event is emitted when it becomes ready to use.
        this.ready = false;

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

    Fightly.prototype.listen = function () {
        var self = this;

        var gamesLoaded = false;
        var modulesLoaded = false;

        //== Network Events ==//

        this.on('connection', function () {
            // Require modules list from the server when we first connect
            self.server.data('modules');
            // Require games list from the server
            self.server.data('games');
        });

        this.on('data', function (data) {
            self.messager.parse(data);
        });

        //== Messager Events ==//

        // We received the list of modules.
        this.on('modulesData', function (modules) {
            self.loadModules(modules);
        });

        // We received the list of games.
        this.on('gamesData', function (games) {
            self.games = games;

            gamesLoaded = true;
            if (modulesLoaded && !self.ready) {
                self.ready = true;
                self.emit('ready');
            }

            self.emit('gamesUpdated');
        });

        // We received our own identity.
        this.on('identityData', function (identity) {
            self.identity = identity;

            // This also means that we have joined a game!
            self.emit('gameJoined');
        });

        // We received new data for an entity.
        this.on('entityData', function (entity) {
            self.updateEntity(entity);
        });

        //== Internal Events ==//

        this.on('modulesLoaded', function () {
            modulesLoaded = true;
            if (gamesLoaded && !self.ready) {
                self.ready = true;
                self.emit('ready');
            }
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

    Fightly.prototype.updateEntity = function (newEntity) {
        var entity = this.get(newEntity.id);

        if (!entity) {
            // That entity doesn't exist yet, create it.
            var args = [newEntity.id];
            args = args.concat([newEntity.type]);
            this.e.apply(this, args);
        }
        else {
            for (var p in newEntity) {
                entity[p] = newEntity[p];
            }
        }
    };

    Fightly.prototype.refreshGames = function () {
        this.server.data('games');
    };

    Fightly.prototype.refreshModules = function () {
        this.server.data('modules');
    };

    return Fightly;
});
