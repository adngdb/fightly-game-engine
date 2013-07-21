/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

define(['network', 'vendor/component-entity/component-entity-manager', 'vendor/action-manager/action-manager'], function (
        network, cem, am
) {
    "use strict";

    function is_null(variable) {
        return variable === null || typeof variable === 'undefined';
    }

    var F = function (config) {
        this.config = config;
    };

    var onMessage = function (message) {
        console.log('onMessage: ' + message);

        if (message.hasOwnProperty('modules')) {
            console.log(message.modules);
        }
    };

    F.prototype.init = function () {
        var self = this;

        this.cem = new cem.ComponentEntityManager();
        this.am = new am.ActionManager();

        // create network connexion
        this.server = new network.ComManager(this.config.network);
        this.server.init(function () {
            // Require modules list from the server
            self.server.data('modules');
        }, onMessage);
    };

    F.prototype.loadModules = function (modules) {
        ;
    }

    F.prototype.loadActions = function (module, moduleName) {
        // load the actions of a given module
    };

    F.prototype.loadComponents = function (module, moduleName) {
        // load the components of a given module
    };

    return F;
});
