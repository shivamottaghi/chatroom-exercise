const express = require('express');
const http = require('http');

const app = express();
const clientPath = `../client`;
app.use(express.static(clientPath));
const server = http.createServer(app);
const port = 8080;
server.listen(8080, () =>{
    console.log("server running on "+port);
});

const io = require('socket.io')(server);
let counter = 0;
//server connection
io.on('connection', (socket) => {
    console.log('someone connected');
    socket.on('sendToAll', (message) =>{
        //console.log(message);
        io.emit("displayMessage", message);
    });
    socket.on('sendToMe', (message) =>{
        socket.emit('displayMessage', message);
    });
});