const express = require('express');

const app = express();
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');

// view engine setup, path is given with nodejs.
// finds our views
app.set('views', path.join(__dirname, 'views'));
// set up template engine, what template are we going to use.
app.set('view engine', 'pug');

// handles how data is logged
app.use(logger('dev'));
// will parse the bodies of all incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// here we have all our paths, when user requests a certain path then we run it.
app.use('/', routes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
