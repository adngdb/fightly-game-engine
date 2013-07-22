# Fightly Game Engine

A game engine for strategic, turn-based, web games. The goal is to be heavily modular, to allow a wide variety of turn-based games to be developed.

## Features

* simple client-side interface in JavaScript
* complete server stack using ``node.js`` and ``socket.io``
* based on modules

All you should have to do is find the right modules, and develop the front-end of your game.

## Current state

Fightly is still in early development, most of the features are not ready. If you're interested, feel free to help! You can look at the open issues, read and comment the source code, send pull requests, or test the current version on your environment -- any help is appreciated!

# Development

## Modules

At the moment, modules use the ``amdefine`` library to run on the server. You will need to install that dependency first:
```sh
$ cd fightly/modules/
$ npm install
```

## Server

You will need ``node.js`` and ``npm`` installed on your host first. See for example the [download page of node.js](http://nodejs.org/download/) or this [guide to installing node and npm](http://joyent.com/blog/installing-node-and-npm).

Install the dependencies:
```sh
$ cd fightly/server/
$ npm install
```

Run the unit tests:
```sh
$ ./runtests
```

Run the server:
```sh
$ node server.js
```

## Client

Create a link to ``fightly/`` in your Web directory (or configure your Web server to point to ``fightly/``) and browse to the corresponding URL. Then in your HTML document, you can chose to use either the compiled version or the development version of fightly.

There is currently nothing to see in the client, except in the logs. Open your browser's console!

### Compiled

Run the following command to compile fightly:
```sh
$ cd fightly/client/
$ make
```

That will create ``fightly/client/fightly.js`` which is a compiled version of the client source code, including ``require.js``. You then just need to link that file from your HTML document and start using fightly like that:
```html
<script src="fightly/client/fightly.js" data-main="main.js"></script>
```

In ``main.js``:
```javascript
require(['fightly'], function (fightly) {
    var config = {};
    var F = new fightly(config);
    F.init();
});
```

### Development

To use the development version of fightly, simply link to ``fightly/client/lib/require.js`` and configure ``require.js`` to have the rights paths. For example:
```javascript
requirejs.config({
    baseUrl: 'fightly/client/src',
    paths: {
        'lib': '../lib',
        'config': '../config',
        'vendor': '../../vendor'
    },
});
```
