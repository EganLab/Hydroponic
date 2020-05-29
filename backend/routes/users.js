const router = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.post('/', async (req, res) => {
  // Create a new admin
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(200).json({
      user: {
        _id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token: token
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);
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

router.get('/me', auth, async (req, res) => {
  // View logged in user profile
  // TODO what happen if not validate token
  const user = {
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    staffs: req.user.staffs,
    farms: req.user.farms
  };
  res.json({
    user
  });
});

router.post('/me/logout', auth, async (req, res) => {
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

router.post('/me/logoutall', auth, async (req, res) => {
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
// ====================== Staff===========================

router.post('/createStaff', auth, async (req, res) => {
  // Create a Staff
  if (req.user.role === 1) {
    try {
      let staff = new User(req.body);
      staff.supervisor = req.user._id;
      let staffData = await staff.save();

      req.user.staffs.push({ _id: staffData._id, name: staffData.name });
      await req.user.save();

      res.status(201).json({
        success: true,
        message: 'Create staff successfully'
      });
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'You do not have permission to create a new Staff'
    });
  }
});

router.get('/staff/:id', auth, async (req, res) => {
  if (req.user.role === 1) {
    let staffId = req.params.id;
    let isHave = req.user.staffs.filter(staff => {
      return JSON.stringify(staff._id) === JSON.stringify(staffId);
    });
    if (isHave.length > 0) {
      const staffInfo = await User.findById({ _id: staffId });
      const staff = {
        _id: staffInfo._id,
        email: staffInfo.email,
        name: staffInfo.name,
        dateOfBirth: staffInfo.dateOfBirth,
        farms: staffInfo.farms
      };
      res.status(200).json(staff);
    } else {
      res.status(400).json({
        success: false,
        message: 'You do not have permission to get staff info or do not have this staff'
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'You do not have permission to get staff info'
    });
  }
});

module.exports = router;
