const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const InitiateMongoServer = require("./config/database");
const authRoutes =require("./routes/auth");
require('dotenv').config();

const PORT = process.env.PORT;

InitiateMongoServer();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// app.get('/', (req, res) => {
//     res.send("now sever is running ")
// })

const server = app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`))


const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", data => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    })
})