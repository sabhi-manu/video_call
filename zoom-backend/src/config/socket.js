import { Server } from "socket.io";

let connections = {}
let message = {}
let timeOnline ={}


function connectSocket(server){
  const io = new Server(server , {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"]
    }
  })
  
  io.on("connection",(socket)=>{
    console.log("socket io connect successfully.",socket.id)
  })


  return io
}
export default connectSocket