const express = require('express');
const mustache = require('mustache-express');
const router = require('./routes/index');
const helpers = require('./helpers');

const app = express();

app.use((req, res, next) => {
    res.locals.h = helpers; //Global variables
    next();
});

app.use('/', router);
app.use(express.json());

// Mustache Express
app.engine('mst', mustache(__dirname + '/views/partials', '.mst'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

module.exports = app;