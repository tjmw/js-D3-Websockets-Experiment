# D3/Websockets Experiment

## Overview

Just a learning experiment cobbled from pieces of
[this excellent websockets tutorial](http://martinsikora.com/nodejs-and-websocket-simple-chat-tutorial) and [these excellent d3 tutorials](https://github.com/mbostock/d3/wiki/Tutorials).

## Dependencies

    $ npm install websocket

## Setup
Update this line of index.html to wherever the websocket server is running:

    var wsServer = 'ws://localhost:1337/';

## Running

Websocket server:

    $ node server/websocket-server.js

Client:

    $ python -m SimpleHTTPServer # or whatever...
