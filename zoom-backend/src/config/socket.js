import { Server } from "socket.io";

let user = {}
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
    socket.on("join",()=>{
      const otherUser = Object.keys(user)[0]
      if(otherUser){
        user[otherUser] = socket.id
        user[socket.id] = otherUser
        io.to(otherUser).emit("peer-joined",socket.id)
        socket.emit("peer-joined",otherUser)
         console.log("connection double  member ==>",user)
      }else{
        user[socket.id]= null
     
        console.log("connection single member ==>",user)
      }

    })

   socket.on("signal",({to,data})=>{
    console.log("this is signal to==>",to," this is data what we have to pass ==>",data)
    io.to(to).emit("signal",{
      from:socket.id,
      data 
    })
   })
   socket.on("disconnect",()=>{
    const peer = user[socket.id]
    if(peer){
      io.to(peer).emit("peer-left")
      delete user[peer]
    }
    delete user[socket.id]
   })

  socket.on("leave", () => {
  const peer = user[socket.id];
  if (peer) {
    io.to(peer).emit("peer-left");
    delete user[peer];
  }
  delete user[socket.id];
});
 
  })

  return io
}
export default connectSocket