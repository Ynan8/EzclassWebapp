const express = require("express");
const cors = require('cors');

const { readdirSync } = require('fs');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const morgan = require('morgan');
const connectDB = require("./config/db");
require('dotenv').config();
const csrfProtection = csrf({ cookie: true })

const http = require('http')

const { Server } = require("socket.io")



//express
const app = express();
const httpServer = require('http').createServer(app);

const io = new Server(httpServer)

// connectDB

connectDB()


// middleware
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(morgan('dev'));

// route
readdirSync("./routes")
    .map((r) => app.use("/api", require(`./routes/${r}`)));


const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                firstName: userSocketMap[socketId],
            }
        }
    )
}
io.on("connection", (socket) => {
    // console.log(`User connection: ${socket.id}`)
    socket.on('join', ({ roomId, firstName }) => {
        userSocketMap[socket.id] = firstName;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId)
        // console.log(clients)
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit('joined', {
                clients,
                firstName,
                socketId: socket.id,
            })
        })
    })

    socket.on("code-change", ({ roomId, code }) => {
        // Broadcast the 'code-change' event to all clients in the room
        io.to(roomId).emit("code-change", { code });
    });    // for user editing the code to reflect on his/her screen

    // socket.on("sync-code", ({socketId, code}) => {
    //     io.on(socketId).emit("sync-code", {code});
    // });

    // leave room
    socket.on("disconnecting", () => {
        const rooms = [...socket.rooms];
        // leave all the room
        rooms.forEach((roomId) => {
            socket.in(roomId).emit('disconnected', {
                socketId: socket.id,
                firstName: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });

})
// port
const port = process.env.PORT || 8000;

async function startServer() {
    httpServer.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
startServer();