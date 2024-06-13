const express = require('express');
const dbConnect = require('./config/database');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const apiRoutes = require("./routes/index");

app.use('/api', apiRoutes);

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.listen(3000, async () => {

    console.log(`server started at PORT ${PORT}`);

    await dbConnect();

});