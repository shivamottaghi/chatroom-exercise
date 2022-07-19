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