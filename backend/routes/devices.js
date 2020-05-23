const router = require('express').Router();
const auth = require('../middleware/auth');
const Device = require('../models/Device');

router.get('/test', auth, async (req, res) => {
  res.json({
    hello: req.user.name
  });
});

router.post('/add', auth, async (req, res) => {
  // user add device
  console.log(req.body, req.user);
  // try {
  //   req.user.tokens = req.user.tokens.filter(token => {
  //     return token.token != req.token;
  //   });
  //   await req.user.save();
  res.status(200).json({
    success: true
  });
  //     success: true,
  //     msg: 'logout successfully'
  //   });
  // } catch (error) {
  //   res.status(500).send(error);
  // }
});

module.exports = router;
