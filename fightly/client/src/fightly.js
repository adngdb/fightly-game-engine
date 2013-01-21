/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

define(['src/network'], function (
        network
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

        // create network connexion
        this.server = new network.ComManager(this.config.network);
        this.server.init(function () {
            self.loadModules();
        }, onMessage);
    };

    F.prototype.loadModules = function () {
        // Get modules and files list from server
        this.server.data('modules');
        // Load each file
        // Then call loadActions and loadComponents for each module
    };

    F.prototype.loadActions = function (module, module_name) {
        // load the actions of a given module
    };

    F.prototype.loadComponents = function (module, module_name) {
        // load the components of a given module
    };

    return F;
});
