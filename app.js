//const express = require('express');

const express = require('express');
const bodyParser = require('body-parser');
const uploadRouter = require('./routes/uploadRouter')
const mongoose = require( "mongoose");
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();


const app = express();
app.use (cors());

app.use(express.json());
app.use(express.static('public'))

//routes
app.use('/img',uploadRouter)




const connectToMongoDB = async() =>{
    try {   
        await mongoose.connect(process.env.MONGODB_URL,
            console.log('connected to MongoDB')
        )
    } catch (error) {
        console.log('Error connecting to MongoDB',error.message);
    }
}

app.listen(process.env.PORT, () => {
    connectToMongoDB()
    console.log(`Server is running on ${process.env.PORT} `);
});