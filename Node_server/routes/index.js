const router = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.post('/users', async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({
      user: {
        _id: user.id,
        email: user.email,
        name: user.name
      },
      token: token
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/users/login', async (req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);
    console.log('aaa', user);
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }
    const token = await user.generateAuthToken();

    res.json({
      user: {
        _id: user.id,
        email: user.email,
        name: user.name
      },
      token: token
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/users/me', auth, async (req, res) => {
  // View logged in user profile
  res.json({
    user: {
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name
    }
  });
});

router.post('/users/me/logout', auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });
    await req.user.save();
    res.status(200).json({
      success: true,
      msg: 'logout successfully'
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/users/me/logoutall', auth, async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.status(200).json({
      success: true,
      msg: 'logout all device successfully'
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
