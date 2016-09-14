/* ****************************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 *****************************************************************************/

(function (module) {
"use strict";

var util = require('util');
var events = require('events');
var EntityManager = require('ensy');

var am = require('../../vendor/action-manager/action-manager');

/**
 * Class Game
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
class Game extends events.EventEmitter {
    constructor(id) {
        super();

        this.id = id;
        this.clients = [];

        this.manager = new EntityManager(this);
        this.actions = new am.ActionManager();

        this._initEventsListeners();
    }

    /**
     * Create bindings for all events the game engine can handle.
     *
     * @return this.
     */
    _initEventsListeners() {
        this.on('entityComponentUpdated', (entity, componentData) => {
            for (var i = this.clients.length - 1; i >= 0; i--) {
                // TODO: Send the component data as well.
                this.clients[i].send({data: entity});
            };
        });
    }

    addClient(playerEntity, client) {
        this.clients.push(client);
    }

    toJSON() {
        return {
            'id': this.id,
            'players': this.clients.length,
        };
    }
}

module.exports = Game;

})(module);
