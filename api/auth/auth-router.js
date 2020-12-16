const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const User = require('../users/users-model');
const { validateCreds } = require('./middleware');
const { jwtSecret } = require('../../config/secret');

const makeToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };
  const options = {
    expiresIn: '1200s'
  };
  return jwt.sign(payload, jwtSecret, options);
};

router.post('/register', validateCreds, async (req, res) => {
  const creds = req.body; 
  const rounds = process.env.BCRYPT_ROUNDS || 4;

  const hash = bcryptjs.hashSync(creds.password, rounds); 
  creds.password = hash; 

  try {
    const newUser = await User.addUser(creds);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findBy({ username: username }); 
    if (user && bcryptjs.compareSync(password, user.password)) {
      const token = makeToken(user);
      res.status(200).json({
        message: `Welcome to our API ${user.username}`,
        username: user.username,
        token: token
      });
    } else {
      res.status(401).json({ message: "INVALID CREDENTIALS "});
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

module.exports = router;