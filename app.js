const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const logger = require('morgan');

const app = express();

// Express View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Express Sass setup
app.use(
    require('node-sass-middleware')({
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        outputStyle: process.env.NODE_ENV === 'development' ? 'nested' : 'compressed',
        force: process.env.NODE_ENV === 'development',
        sourceMap: true
    })
);

// Middleware Setup
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/images/favicon.ico')));

// Mount base router on app, after setting up other middleware
// node by default looks for index.js in the directory that is imported, if what is imported is a directory and not a file
const baseRouter = require('./routes'); // requires only the contents of index.js file inside of the routes directory
const celebritiesRouter = require('./routes/celebrities');

app.use('/', baseRouter);
// first param can be omitted if the router is not being mounted on top of any path
app.use('/', celebritiesRouter);

// Catch 404 and render a not-found.hbs template
app.use((req, res, next) => {
    res.status(404);
    res.render('not-found');
});

app.use((error, req, res, next) => {
    console.error('ERROR', req.method, req.path, error);
    res.status(500);
    res.render('error');
});

module.exports = app;