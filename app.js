'use strict';
// NODE
var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser');

// Database
var monk = require('monk'),
    db = monk('localhost:27017/expTut');

// Libraries
var hbs = require('hbs');

// App
var app = express(),
    routes = require('./routes/index'),
    users = require('./routes/users');

// set up the view engine
app.set('view engine', 'html');
app.engine('html', hbs.__express);

// Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// Make the DB accessible to our router
app.use(function(req, res, next) {
    req.db = db;
    next();
});

// Routing
app.use('/', routes);
app.use('/users', users);

app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});
