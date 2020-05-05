const router = require('express').Router();
const auth = require('../middleware/auth');
// const Device = require('../models/Device');

router.get('/test', auth, async (req, res) => {
  res.json({
    hello: req.user.name
  });
});

module.exports = router;
