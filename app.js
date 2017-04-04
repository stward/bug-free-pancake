const express      = require('express'),
      path         = require('path'),
      logger       = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser   = require('body-parser'),
      mongoose     = require('mongoose'),
      uriUtil       = require('mongodb-uri');

const app = express();

const options = {
  server:  { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost/quiz";
const mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);

const gameRoutes     = require('./routes/game');
const questionRoutes = require('./routes/questions');
const playerRoutes   = require('./routes/players');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 3000));

app.use('/api', gameRoutes);
app.use('/api', questionRoutes);
app.use('/api', playerRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = app;
