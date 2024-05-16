const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
//Them ham thu vien cu de phu hop esp8266
const io = new Server(server, {
    allowEIO3: true,
    cors: {
        origin: '*',
        methods: [
            'GET', 'POST'
        ],
        credentials: true
    },
    // transports: ['websocket', 'polling'],
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

    socket.on("chat message", (msg) => {
        console.log(msg);
        io.emit("chat message", msg);
    });

    socket.on("phancung", (msg) => {
        console.log("phancung", msg);
         io.emit("chat message", msg);
    });

    const interval = setInterval(() => {
        var msg = {
            username: "S",
            message: "Tin nhắn từ server " + Date.now().toString(),
            time: "currentTime",
        };
        socket.emit("phancung", msg);
    }, 5000);
});

server.listen(3010, () => {
    console.log("Server is running on port 3010");
});
