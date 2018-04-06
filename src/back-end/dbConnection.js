"use strict";

const mongoose = require("mongoose");

const config = require("./resources/config");

const OPTIONS = {
    autoReconnect: true,
    keepAlive: 120
};

function connect() {
    mongoose.connect(config.connectionString, OPTIONS)
        .then(
            () => console.log("Connected to MongoDB"),
            (err) => {
                console.error(`Connection error: ${err}`);

                process.exit(1);
            }
        );
}

module.exports = exports = { connect };