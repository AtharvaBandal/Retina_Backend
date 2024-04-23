const path = require('path');
const multer = require('multer');
const userModel = require('../models/userModel');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const Imageupload = async (req, res) => {
  try {
    upload.none()(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!req.body.image || !req.body.name) {
        return res.status(400).json({ error: 'No file uploaded or No patient name' });
      }

      const user = await userModel.create({
        name: req.body.name,
        image: req.body.image
      });

      if (user) {
        return res.status(200).json({
          name: req.body.name,
          image: user.image
        });
      }
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { Imageupload };