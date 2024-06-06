const express = require('express');
const dbConnect = require('./config/database');
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.listen(3000, async () => {

    console.log(`server started at PORT ${PORT}`);

    await dbConnect();

});