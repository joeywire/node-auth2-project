const router = require('express').Router();

const User = require('./users-model');
const { adminAccessOnly } = require('../auth/middleware');

router.get('/', adminAccessOnly, async (req, res) => {
  try {
    const usersData = await User.getAll();
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).error({ message: error.message });
  }
});

module.exports = router;