import express from 'express'
import { Server } from 'socket.io';
import http from 'node:http'
import { socketHandler } from './src/modules/socket/socket.handler'

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Initialize socket handlers
socketHandler(io);

app.get("/", (req, res)=>{
   res.json({
     message: "runs from bun"
   }) 
})

app.get("/health-check", (req, res)=>{
    res.json({
     message: "health run"
   }) 
})

server.listen(3000, ()=>{
    console.log("Server running on port 3000")
    console.log("Socket.IO server initialized")
})