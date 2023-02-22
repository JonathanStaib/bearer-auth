'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3002;

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/router/index.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);

// Catchalls
app.use(notFound);
app.use(errorHandler);

const start = () => {
  app.listen(PORT, () => console.log('listening on port: ', PORT));
};

module.exports = {
  app,
  start,
};

// module.exports = {
//   server: app,
//   startup: (port) => {
//     app.listen(port, () => {
//       console.log(`Server Up on ${port}`);
//     });
//   },
// };
