const fs = require('fs');
const path = require('path');
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const HttpError = require('./models/error-http');
/// Import routes
const facilitiesRouts = require('./routes/facilities-routes');
const itemsRouts = require('./routes/items-routes');
//const usersRoutes = require('./routes/items-routes');

const app = express();
app.use(bodyParser.json());

// CORS settings
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE');

  next();
});

/////////////////////////////////////////////
///  ROUTES
/////////////////////////////////////////////

// Local static path
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use('/api/facilities', facilitiesRouts);
app.use('/api/items', itemsRouts);
// app.use('/api/users', usersRoutes);

/////////////////////////////////////////////
// Boilerplate, no need to touch what's below

/////////////////////////////////////////////
// Logger & configuration
function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
}
app.use(logger);
/////////////////////////////////////////////


// For production, handle any requests that don't match the ones above
app.use('/',express.static(path.join(__dirname, 'client/build')));
app.use('/about/',express.static(path.join(__dirname, 'client/build')));
app.use('/materials/',express.static(path.join(__dirname, 'client/build')));

// Wild-card, so handle everything else
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.json(err)
});

// Set up configuration variables
if (!process.env.MONGODB_URI) {
  console.log('- Error - Must specify the following env variables:');
  console.log("E.g. MONGODB_URI='mongodb://someUser:somePW@site.com:1234/someDB'");
  process.exit(1);
}
const MONGODB_URL = process.env.MONGODB_URI;
const splitUrl = MONGODB_URL.split('/');
const mongoDbDatabaseName = splitUrl[splitUrl.length - 1];

mongoose
  .connect(MONGODB_URL, { useCreateIndex: true,  useNewUrlParser: true, useUnifiedTopology: true, })
  .then(() => {
    // Start the server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`
        *********************************************
        * Backend server up at port ${PORT}         *
        *********************************************
      `);
    });
  })
  .catch(err => {
    console.log(err);
  });
