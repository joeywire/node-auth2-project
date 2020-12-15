const router = require('express').Router();

const User = require('./users-model');

router.get('/', async (req, res) => {
  try {
    const usersData = await User.getAll();
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).error({ message: error.message });
  }
});

module.exports = router;