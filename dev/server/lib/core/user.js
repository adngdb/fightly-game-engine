/* *********************************************************************
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
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function User(id, login) {
    this.id = id;
    this.login = login;
    this.inGame = null;
};

User.prototype = {
};

module.exports = User;
