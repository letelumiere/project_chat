const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


//websocket은 .onmessage()와 .send로 통신을 한다? 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

io.on('connection', (socket) => {
    console.log('user connected.');

    socket.on('disconnect', (socket) => {
        console.log('is disconnected.');
    });

    socket.on('chat message', (msg) => {
        console.log("message: " + msg);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.broadcast.emit('hi');
});


