const express = require('express');
const http = require('http');
const app = express();
const clientPath = `../client`;

app.use(express.static(clientPath));

const server = http.createServer(app);
const port = 8080;
server.listen(8080, () => {
    console.log("server running on " + port);
});
const io = require('socket.io')(server);


// My variables
let onlineUsers = [];


//server connection
io.on('connection', (socket) => {
    socket.on('setUserName', userName => {
        onlineUsers.push(userName);
        io.emit('displayUsers', onlineUsers);
        socket.username = userName;
        //console.log(onlineUsers)
    });
    socket.on('disconnect', () => {
        removeUser(socket.username);
        io.emit('displayUsers', onlineUsers);
    })
    console.log('someone connected');
    socket.on('sendToAll', (message) => {
        let userMessage = [];
        console.log(socket.username)
        userMessage.push(socket.username);
        userMessage.push(message)
        io.emit("displayMessage", userMessage);
    });
    socket.on('sendToMe', (message) => {
        let userMessage = [];
        userMessage.push(socket.username);
        userMessage.push(message)
        socket.emit('displayMessage', userMessage);
    });
});

//My serverside functions
const removeUser = (userName) => {
    let index = onlineUsers.indexOf(userName);
    onlineUsers.splice(index , 1);
}
