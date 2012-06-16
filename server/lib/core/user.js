/* *********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

/**
 * Class User
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function User(id, login) {
    this.id = id;
    this.name = login;
    this.inGame = null;
};

module.exports = User;
