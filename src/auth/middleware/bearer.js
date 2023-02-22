'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { next('Invalid Login'); }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateWithToken(token);

    req.user = validUser;
    req.token = validUser.token;

  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};

// module.exports = async (req, res, next) => {
//   if(!req.headers.authorization){
//     next('Not Authorized, no token found');
//   } else{
//     try{
//       // verifying it is Bearer Auth
//       let authType = req.headers.authorization.split(' ')[0];
//       if(authType === 'Bearer'){
//         let token = req.headers.authorization.split(' ')[1];
//         console.log('token from bearer: ', token);

//         let validUser = await users.authenticateBearer(token);
//         if(validUser){
//           req.user = validUser;
//           next();
//         }
//       } else {
//         next('send a token in a bearer auth string');
//       }
//     }catch(e){
//       console.error(e);
//       next(e);
//     }
//   }
// };
