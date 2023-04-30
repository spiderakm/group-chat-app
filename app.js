const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const userRoute = require('./routes/userroute');

const sequelize = require('./utils/db');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/user', userRoute);

sequelize.sync();

app.listen(4000);