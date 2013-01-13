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

    F.prototype.init = function () {
        // create network connexion
        this.server = new network.ComManager(this.config.network);
        this.server.init();

        this.loadModules();
    };

    F.prototype.loadModules = function () {
        // Get modules and files list from server
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
