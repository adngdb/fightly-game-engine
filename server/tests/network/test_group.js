/**
 * Test cases for network.Group class.
 *
 * Requires node.js and its nodeunit module.
 * To run those tests: ./runtests
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
var util = require('util');

var group = require('../../lib/network/group');

// Mocking the Client class
var Client = function() {
    this.msgSent = 0;
    this.send = function(msg) {
        this.msgSent++;
    }
}

exports['addClient'] = function (test) {
    var myGroup = new group.Group(1);

    test.equal(myGroup.clients.length, 0);

    var c1 = new Client(),
        c2 = new Client();

    myGroup.addClient(c1);

    test.equal(myGroup.clients.length, 1);
    test.equal(myGroup.clients[0], c1);

    myGroup.addClient(c2);

    test.equal(myGroup.clients.length, 2);
    test.equal(myGroup.clients[1], c2);

    test.done();
}

exports['send'] = function (test) {
    var myGroup = new group.Group(1);

    test.equal(myGroup.clients.length, 0);

    var c1 = new Client(),
        c2 = new Client();

    myGroup.addClient(c1);
    myGroup.send('some message');

    test.equal(c1.msgSent, 1);

    myGroup.addClient(c2);
    myGroup.send('some message');

    test.equal(c1.msgSent, 2);
    test.equal(c2.msgSent, 1);

    test.done();
}

exports['removeClient'] = function (test) {
    var myGroup = new group.Group(1);

    test.equal(myGroup.clients.length, 0);

    var c1 = new Client(),
        c2 = new Client();

    myGroup.addClient(c1);
    myGroup.addClient(c2);

    test.equal(myGroup.clients.length, 2);

    myGroup.removeClient(c1);

    test.equal(myGroup.clients.length, 1);
    test.equal(myGroup.clients[0], c2);

    test.done();
}
