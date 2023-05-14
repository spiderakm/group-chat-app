const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

const user = require('./models/usermodel')
const message = require('./models/message')
const group = require('./models/group')
const usergroup = require('./models/usergroup')

const userRoute = require('./routes/userroute');
const chat = require('./routes/chatroute')
const grouproute = require('./routes/grouproute')

const sequelize = require('./utils/db');

const server = require('http').createServer(app)
const io = require('socket.io')(3000,{
    cors: {
        origin : "*"
    }
})

io.on("connection", socket => {
    console.log(`socket connection established with ${socket.id}`);
    socket.on('send-message',data =>{
        io.emit('receive-message', data)

    })

});


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
app.use("/group",grouproute)




//associations
user.hasMany(message)
message.belongsTo(user)

group.belongsToMany(user,{through:usergroup})
user.belongsToMany(group,{through:usergroup})



sequelize.sync();

app.listen(4000);