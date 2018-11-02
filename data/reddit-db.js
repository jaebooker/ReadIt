const mongoose = require("mongoose");
const assert = require("assert");
const url = "mongodb://localhost/reddit-clone";

mongoose.Promise = global.Promise;
mongoose.connect(
    url,
    {   useNewUrlParser: true},
    function(err, db) {
        assert.equal(null, err);
        console.log("Connected to the database");
    }
);
mongoose.connection.on("error", console.error.bind(console, "connection to the database has failed: "));
mongoose.set("debug", true);

module.exports = mongoose.connection;
