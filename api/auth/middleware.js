const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secret');


const validateCreds = (req, res, next) => {
  const creds = req.body; 
  if (creds.username && creds.password && creds.department) {
    next();
  } else { 
    res.status(400).json({ message: 'Provide a valid Username, Password and Department'}); 
  }
}; 

const restrictAccess = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json('No Token Provided');
  } else {
    //chek token with jwt (asnc form verify)
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) {
        res.status(401).json({ access: "DENIED", errorMSG: error.message })
      } else {
        //token valid and not expired
        //tack the decoded token to req and proceeeddd
        req.decodedToken = decoded; 
        next();
      }
    });
  }
};

const adminAccessOnly = (req, res, next) => {
  if (req.decodedToken.department === 'admin') {
    next()
  } else {
    res.status(403).json({ message: "You do not have access to this information"});
  }
};

module.exports = {
  validateCreds, 
  restrictAccess,
  adminAccessOnly
}