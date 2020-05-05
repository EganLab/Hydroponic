const router = require('express').Router();
const auth = require('../middleware/auth');
// const Tracking = require('../models/Tracking');

router.get('/test', auth, async (req, res) => {
  res.json({
    hello: req.user.name
  });
});
module.exports = router;
