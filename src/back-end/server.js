"use strict";

const express    = require("express");
const bodyParser = require("body-parser");
const helmet     = require("helmet");

const connfigRouter = require("./routers/configRouter");

const app = express();

const PORT = process.env.PORT || 3001;

function mapRoutes() {
    app.get("/", (req, res) => {
        res.sendFile("index.html");
    });

    app.use("/config", connfigRouter);
}

function startServer() {
    const buildPath = __dirname + "/../../build/" ;

    app.use(express.static(buildPath));
    app.use(express.static(buildPath + "static"));
    
    app.use(helmet());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    mapRoutes();
    
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`)); 
}

module.exports.start = startServer;