const express = require('express');
const bodyParser = require('body-parser');
const user_functions = require('./user-functions');
const morgan = require('morgan');

Registration = user_functions.registration
verify_password = user_functions.verifyPassword

const PORT = 3002;

const app = express();

app.use(morgan('dev'));

// Set up CORS headers to handle any CORS errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Parse JSON request bodies
app.use(bodyParser.json());

app.post('/user', (req, res) => {
  const { email, password, request, name, surname } = req.body;

  if (request === 'register') {
    const reg_status = Registration(email, password, name, surname);

    if (reg_status) {
      // Send the response
      res.status(200).end();
    } else {
      // Send conflict response
      res.status(409).end();
    }
  } else if (request === 'login') {
    const log_status = verify_password(email, password);

    if (log_status === 2) { // user found and password matches
      // Send the response
      res.status(200).end();
    } else if (log_status === 1) { // user found but password doesn't match
      // Send unauthorized response
      res.status(401).end();
    } else { // user not found
      // Send user not found response
      res.status(404).end();
    }
  } else {
    // Invalid request type
    res.status(400).end();
  }
});

app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`);
;
});
