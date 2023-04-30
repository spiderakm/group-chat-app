const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

const user = require('./models/usermodel')
const message = require('./models/message')

const userRoute = require('./routes/userroute');
const chat = require('./routes/chatroute')

const sequelize = require('./utils/db');

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(
    cors({
        origin : "*",
    })
)


app.use('/user', userRoute);
app.use("/chat",chat)

//associations
user.hasMany(message)
message.belongsTo(user)

sequelize.sync();

app.listen(4000);