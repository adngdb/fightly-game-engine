/* ****************************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 * ***************************************************************************/
// for compatibility with node.js and require.js
if (typeof define !== 'function') {
    var define = require('amdefine')(module)
}

define(function () {
    /**
     * Class Player
     *
     * @author Adrian Gaudebert - adrian@gaudebert.fr
     * @constructor
     */
    var Player = {
        'inGame': null,
    };

    return {
        'Player': Player
    };
});
