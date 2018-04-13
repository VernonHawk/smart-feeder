"use strict";

const express    = require("express");
const bodyParser = require("body-parser");
const helmet     = require("helmet");

const connfigRouter = require("./routers/configRouter");

const app = express();

const PORT = process.env.PORT || 3001;

function mapRoutes() {
    app.use("/config", connfigRouter);
}

function startServer() {
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    mapRoutes();
    
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`)); 
}

module.exports.start = startServer;