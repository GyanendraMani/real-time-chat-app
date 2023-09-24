const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const InitiateMongoServer = require("./config/database");

require('dotenv').config();

const PORT = process.env.PORT;

InitiateMongoServer();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("now sever is running ")
})

app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`))