Core Classes
============

GameEngine
----------

The main class, that binds everything together.

Game
----

Has an instance of an Entity Manager, a group of clients, and some logic to handle incoming requests and outgoing updates.


Core Components
===============

User
----

Represents a connected device. It is associated with a connection identifier that can be used by the network module. A name can be set.

state:
    clientId - identifier for the network module
    name - a name that can be displayed by the client

GameStatus
----------

Represents an ongoing game. Can be created, joined by users, and has a status.

state:
    status - current status of the game, can be any of 'waiting', 'playing', 'finished'
    players - list of users currently in the game
    currentPlayer - id of the player currently playing


Core Actions
============

createGame
----------

Params:
    none

Ask for a new Game to be created. The User will automatically join that new Game.

joinGame
--------

Params:
    gameId: identifier of the game to join

Ask for the User to join an existing Game.

nextTurn
--------

Params:
    none

Pass the turn to the next player.


Core Messages
=============

modules
-------

A list of all the available modules (components and actions) to be loaded by the client.

identity
--------

Sent when a user connects, contains his unique identifier to be used in subsequent transactions.

Could use `update` instead? Or be removed? What's the point of having the ID in the client, since it's associated with the network connection? Or is it? Maybe it can be made dead simple at first, without any identity, just relying on the connection, and later on we'll deal with authentication.

games
-----

A list of all the currently available games.

gameJoined
----------

Sent when a User successfully joined a Game.

update
------

Sent with data whenever the state of a Game or any of its components changed.
