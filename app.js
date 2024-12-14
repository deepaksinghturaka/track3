const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server); // Socket.io setup

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index'); // Render index.ejs
});

io.on('connection', (socket) => {
    socket.on("send-location", function(data){
        io.emit("recive-location",{id:socket.id, ...data});
    });
    console.log('A user connected');   

    socket.on('disconnect', () => {
        io.emit("user-disconnected",socket.id);
        console.log('User disconnected');  
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
