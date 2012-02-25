/**
 * Test cases for network.Client class.
 *
 * Requires node.js and it's nodeunit module.
 * To run those tests: nodeunit tests
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
var util = require('util')
    , events = require('events');

var client = require('../../lib/network/client');

// Mocking the Socket class
var Socket = function() {
    this.msgSent = 0;
    this.send = function(msg) {
        this.msgSent++;
    }
    this.on = function() {}
}

exports['send'] = function (test) {
    var socket = new Socket()
        , emitter = new events.EventEmitter()
        , myClient = new client.Client(1, socket, emitter);

    myClient.send('some message');

    test.equal(socket.msgSent, 1);

    myClient.send('some message');

    test.equal(socket.msgSent, 2);

    test.done();
}

exports['receiveAction'] = function (test) {
    var socket = new Socket()
        , emitter = new events.EventEmitter()
        , myClient = new client.Client(1, socket, emitter)
        , nbMsg = 0
        , i, k;

    emitter.on('actionReceive', function() {
        nbMsg++;
    });

    // Test receiving one action
    myClient.receiveAction('action', '');

    test.equal(nbMsg, 1);

    // Test receiving a lot of actions
    nbMsg = 0;
    i = 0;
    k = 100;

    for (; i < k; i++) {
        myClient.receiveAction('action', '');
    }
    test.equal(nbMsg, k);

    test.done();
}
