'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { next('No Basic Auth Header'); }

  let { authorization } = req.headers;
  let authString = authorization.split(' ')[1];
  let decodedAuthStr = base64.decode(authString);
  let [username, password] = decodedAuthStr.split(':');

  try {
    req.user = await users.authenticateBasic(username, password);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};

