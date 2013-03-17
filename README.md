Fightly Game Engine
===================

A game engine for strategic, turn-based, web games. The goal is to be heavily modular, to allow a wide variety of turn-based games to be developed.

Features
--------

* simple client-side interface in JavaScript
* complete server stack using ``node.js`` and ``socket.io``
* based on modules

All you should have to do is find the right modules, and develop the front-end of your game.

Current state
-------------

Fightly is still in early development, most of the features are not ready. If you're interested, feel free to help! You can look at the open issues, read and comment the source code, send pull requests, or test the current version on your environment -- any help is appreciated!

Development
===========

Server
------

You will need ``node.js`` and ``npm`` installed on your host first. See for example the [download page of node.js](http://nodejs.org/download/) or this [guide to installing node and npm](http://joyent.com/blog/installing-node-and-npm).

Install the dependencies:
<pre>
cd fightly/server/
npm install
</pre>

Run the unit tests:
<pre>
./runtests
</pre>

Run the server:
<pre>
node server.js
</pre>

Client
------

Create a link to ``fightly/client/`` in your Web directory (or configure your Web server to point to ``fightly/client/``) and browse to the corresponding URL.

There is currently nothing to see in the client, except in the logs. Open your browser's console!
