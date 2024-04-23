const express = require('express');
const router = express.Router();
const {Imageupload} = require('../controller/uploadImageController')

router.post('/upload',Imageupload);
module.exports = router;