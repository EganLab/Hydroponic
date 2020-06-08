const router = require('express').Router();
const auth = require('../middleware/auth');
const Farm = require('../models/Farm');
const Crop = require('../models/Crop');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var CloudUpload = require('../lib/cloud-upload');

// create crop with farmId
router.post('/create/:id', auth, upload.single('image'), async (req, res) => {
  // only admin or staff work in farm can create crop
  let farmId = req.params.id;
  let isHave = req.user.farms.filter(farm => {
    return JSON.stringify(farm._id) === JSON.stringify(farmId);
  });

  if (isHave.length > 0) {
    try {
      let createParams = req.body;
      createParams.image = await CloudUpload.imageUpload(req.file);
      let crop = new Crop(createParams);
      let cropData = await crop.save();

      await Farm.updateOne(
        { _id: farmId },
        {
          $push: { crops: [{ _id: cropData._id }] }
        }
      );

      res.status(201).json({
        success: true,
        message: 'Create crop successfully'
      });
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'You do not have permission to create a new Crop'
    });
  }
});

router.get('/:id', auth, async (req, res) => {
  let cropId = req.params.id;
  // TODO need more authorization
  try {
    const CropInfo = await Crop.findById({ _id: cropId });

    res.status(200).json(CropInfo);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
