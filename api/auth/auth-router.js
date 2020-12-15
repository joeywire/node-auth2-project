const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const User = require('../users/users-model');

router.post('/register', async (req, res) => {
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

module.exports = router;