const router = require('express').Router();
const auth = require('../middleware/auth');
const Farm = require('../models/Farm');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var CloudUpload = require('../lib/cloud-upload');
const Crop = require('../models/Crop');
const User = require('../models/User');

router.post('/create', auth, upload.single('image'), async (req, res) => {
  // only admin can create farm
  if (req.user.role === 1) {
    try {
      let createParams = req.body;
      createParams.image = await CloudUpload.imageUpload(req.file);
      let farm = new Farm(createParams);
      // Add Supervisor
      farm.supervisor = req.user._id;

      let farmData = await farm.save();

      req.user.farms.push({ _id: farmData._id, name: farmData.name, image: farmData.image });
      await req.user.save();

      res.status(201).json({
        success: true,
        message: 'Create farm successfully'
      });
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'You do not have permission to create a new Farm'
    });
  }
});

router.get('/:id', auth, async (req, res) => {
  let farmId = req.params.id;
  let isHave = req.user.farms.filter(farm => {
    return JSON.stringify(farm._id) === JSON.stringify(farmId);
  });

  if (isHave.length > 0) {
    const farmInfo = await Farm.findById({ _id: farmId });

    res.status(200).json(farmInfo);
  } else {
    res.status(400).json({
      success: false,
      message: 'You do not have permission to get farm info or do not have this farm'
    });
  }
});

router.delete('/:id', auth, async (req, res) => {
  let farmId = req.params.id;
  let isHave = req.user.farms.filter(farm => {
    return JSON.stringify(farm._id) === JSON.stringify(farmId);
  });

  if (isHave.length > 0) {
    const farm = await Farm.findById({ _id: farmId });
    await Crop.deleteMany({ _id: { $in: farm.crops.map(crop => crop._id) } });
    await User.update({ _id: req.user._id }, { $pull: { farms: { _id: farmId } } });
    await Farm.deleteOne({ _id: farmId });

    res.status(200).json({
      success: true,
      message: 'Delete success'
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'You do not have permission to delete farm info or do not have this farm'
    });
  }
});

module.exports = router;
