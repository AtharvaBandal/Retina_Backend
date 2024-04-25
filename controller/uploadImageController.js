const path = require('path');
const multer = require('multer');
const userModel = require('../models/userModel');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const Imageupload = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!req.file || !req.body.name) {
        return res.status(400).json({ error: 'No file uploaded or No patient name' });
      }

      imgName=JSON.stringify(req.file.filename).substring(1,3);
      console.log(imgName);
      outimgPath="/public/output/"+imgName+"_manual1.gif";

      // finalPath  = path.join(__dirname,outimgPath)

      const user = await userModel.create({
        name: req.body.name,
        image: req.file.filename,
        outputImage: outimgPath
      });

      // console.log(outimgPath);

      if (user) {

      
        res.status(200).json({
          name: req.body.name,
          image: user.image,
          outputImage: outimgPath
      
        });
        ;

        
      }
    });
    
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { Imageupload };

