import dotenv from "dotenv"
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

import http from "http"

import connectSocket from "./src/config/socket.js";

const server = http.createServer(app)
const io = connectSocket(server)

dotenv.config();


  async function startServer() {
    try {
        await connectDB()
         console.info("MongoDB connected successfully");

         server.listen(3000,()=>{
            console.info("server is running on port 3000")
         })
    } catch (error) {
        console.error("Server failed to start:", error);
    process.exit(1);
    }
  }

  startServer()