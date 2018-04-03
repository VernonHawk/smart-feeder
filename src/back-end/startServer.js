"use strict";

const db      = require("./dbConnection");
const server  = require("./server");

db.connect();
server.start();