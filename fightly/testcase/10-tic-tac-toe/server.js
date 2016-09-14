var express = require('express');
var fightly = require('fightly');


var F = fightly({
    'webserver': true,
});

// Serve an index.html file.
F.web.get('/', (req, res) => {
    res.sendfile(__dirname + '/client/index.html');
});

// Serve client files.
F.web.use('/static', express.static('client'));
