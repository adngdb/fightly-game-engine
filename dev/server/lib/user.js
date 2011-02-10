/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var util = require("util");

/**
 * Class User
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
exports.User = function(id, login) {
    this.id = id;
    this.login = login;
};

exports.User.prototype = {
};
