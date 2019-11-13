const jwt = require('jsonwebtoken'); //1 npm i jsonwebtoken

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
const token = req.headers.authorization; //2 Put token on header

  if (token) {
    const secret = process.env.JWT_SECRET || 'safe';

    //3 check that token is valid
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err){
        //bad, token has been tampered with
        res.status(401).json({ message: 'Invalid Credentials' });
      }else {
        req.decodedJwt = decodedToken;
        //4 could check role here
        next();
      }
    })

 
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
