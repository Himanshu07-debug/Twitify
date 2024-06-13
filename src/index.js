const express = require('express');
const dbConnect = require('./config/database');
const bodyParser = require('body-parser');
const passport = require("passport");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const passportAuth = require("./config/jwt-middleware")

app.use(passport.initialize());
passportAuth(passport);

const fileUpload = require("express-fileupload"); 

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'        
}));

const cloudinary = require("./config/cloudinary");


const apiRoutes = require("./routes/index");

app.use('/api', apiRoutes);

app.listen(3000, async () => {

    console.log(`server started at PORT ${PORT}`);

    await dbConnect();

    await cloudinary.cloudinaryConnect();

});