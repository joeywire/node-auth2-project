const router = require('express').Router();

const User = require('./users-model');
const { adminAccessOnly } = require('../auth/middleware');

router.get('/', adminAccessOnly, async (req, res) => {
  try {
    const usersData = await User.getAll();
    //sending back decodedToken to verify/ test/ 
    res.status(200).json({data: usersData,  decodedToken: req.decodedToken});
  } catch (error) {
    res.status(500).error({ message: error.message });
  }
});

module.exports = router;