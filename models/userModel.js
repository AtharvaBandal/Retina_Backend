const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    image:String,
    outputImage:String
});

const userModel = mongoose.model('Users',userSchema);
module.exports = userModel; 