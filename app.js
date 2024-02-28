const express = require('express');
const mongoose = require('mongoose');
const app = express()

mongoose
    .connect("asdf", {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    .then(() => console.log("connected to database"));

module.express;