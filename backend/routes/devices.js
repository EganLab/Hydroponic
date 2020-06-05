const router = require('express').Router();
const auth = require('../middleware/auth');
const Device = require('../models/Device');
const Crop = require('../models/Crop');

router.post('/create/:id', auth, async (req, res) => {
  let cropId = req.params.id;
  // TODO check permision to add Device like is he working in that farm have this crop

  const CropInfo = await Crop.findById({ _id: cropId });

  if (!!CropInfo) {
    try {
      let device = new Device(req.body);
      let deviceData = await device.save();

      await Crop.updateOne(
        { _id: cropId },
        {
          $push: { devices: [{ _id: deviceData._id }] }
        }
      );

      res.status(201).json({
        success: true,
        message: 'Create device successfully'
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

module.exports = router;
