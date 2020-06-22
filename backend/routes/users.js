const router = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Farm = require('../models/Farm');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var CloudUpload = require('../lib/cloud-upload');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
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

router.post('/createStaff', auth, upload.single('image'), async (req, res) => {
  const farmId = req.body.farmId;
  // Create a Staff
  if (req.user.role === 1) {
    try {
      // TODO check already exit
      let createParams = req.body;
      createParams.image = await CloudUpload.imageUpload(req.file);

      let staff = new User(createParams);
      staff.supervisor = req.user._id;

      const farmInfo = await Farm.findById({ _id: farmId });
      let staffFarm = {
        _id: farmInfo._id,
        name: farmInfo.name,
        image: farmInfo.image
      };

      staff.farms.push(staffFarm);
      let staffData = await staff.save();
      const staffLabel = { _id: staffData._id, name: staffData.name, image: staffData.image };

      req.user.staffs.push(staffLabel);
      await req.user.save();

      await Farm.updateOne(
        { _id: farmId },
        {
          $push: { staffs: staffLabel }
        }
      );

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
        phonenumber: staffInfo.phonenumber,
        image: staffInfo.image,
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

router.delete('/staff/:id', auth, async (req, res) => {
  if (req.user.role === 1) {
    let staffId = req.params.id;
    let isHave = req.user.staffs.filter(staff => {
      return JSON.stringify(staff._id) === JSON.stringify(staffId);
    });

    if (isHave.length > 0) {
      await User.deleteOne({ _id: staffId });
      await User.update(
        { _id: req.user._id },
        { staffs: req.user.staffs.filter(e => e._id != staffId) }
      );
      const farmIds = req.user.farms.map(el => el._id);
      await Farm.update({ _id: { $in: farmIds } }, { $pull: { staffs: { _id: staffId } } });
      res.status(200).json({
        success: true,
        message: 'Delete success'
      });
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

router.patch('/changePassword', auth, async (req, res) => {
  if (await bcrypt.compare(req.body.oldPassword, req.user.password)) {
    const newPassword = req.body.newPassword;
    const newPasswordConfirm = req.body.newPasswordConfirm;
    if (newPassword === newPasswordConfirm) {
      try {
        req.user.password = newPassword;
        req.user.tokens = [];
        await req.user.save();
        res.status(200).json({
          success: true,
          message: 'Update success'
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: 'Update error'
        });
      }
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Wrong password'
    });
  }
});

module.exports = router;
