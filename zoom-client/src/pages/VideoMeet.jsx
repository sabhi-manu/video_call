import { useEffect, useRef, useState } from 'react'
import {io} from "socket.io-client"


const peerConfigConnections = {
  "iceServers":[
    {urls:"stun:stun.l.google.com:19302"}
  ]
}

const server_url = "http://localhost:3000";


const VideoMeet = () => {
const socket = useRef(null);
  const localVideo = useRef()
  const remoteVideo = useRef()
  const localStream = useRef(null);
  const pc = useRef(null)
  const peerId = useRef(null)
  const [videoCode , setVideoCode ] = useState(true)
  const [mediaReady, setMediaReady] = useState(false);
const [isMuted, setIsMuted] = useState(false);
const [isCameraOff, setIsCameraOff] = useState(false);

  const mediaPermission = async ()=>{
    const stream = await navigator.mediaDevices.getUserMedia({
      video:true,
      audio:true
    })
 
       localStream.current = stream;
      localVideo.current.srcObject = stream;
      setMediaReady(true);
  }
 useEffect(()=>{
  mediaPermission()
 },[])

 useEffect(() => {
  if (!videoCode && localVideo.current && localStream.current) {
    localVideo.current.srcObject = localStream.current;
  }
}, [videoCode]);

 const connectVideo = ()=>{
  setVideoCode(false)
   socket.current =  io(server_url);
   console.log("socket in frontend ==>",socket.current)
   socket.current.emit("join")
   socket.current.on("peer-joined",async(id)=>{
    peerId.current= id
    console.log("this is id from backend ==>",id)
    console.log("this is socket id ==>",socket.current.id)
    createPeer()
    if(socket.current.id < id){  // it compare string character
      const offer = await pc.current.createOffer()
      await pc.current.setLocalDescription(offer) 
      socket.current.emit("signal",{to:id,data:offer})
    }
   })
   
   socket.current.on("signal",async({from,data})=>{
    if(!pc.current) createPeer()
      if(data.type =="offer"){
        await pc.current.setRemoteDescription(data)
        const answer = await pc.current.createAnswer()
        await pc.current.setLocalDescription(answer)
        socket.current.emit("signal",{to:from,data:answer})

      }

      if(data.type === "answer"){
        await pc.current.setRemoteDescription(data)
      }
      if(data.type === "candidate"){
      await pc.current.addIceCandidate(data.candidate)
      }
    
   })

    socket.current.on("peer-left", () => {
      if (pc.current) {
        pc.current.close();
        pc.current = null;
      }
       if (remoteVideo.current) {
    remoteVideo.current.srcObject = null;
  }
    });
 }


const createPeer = ()=>{
  if (pc.current) return;
    if (!localVideo.current) {
    console.warn("Local stream not ready yet");
    return;
  }
  pc.current = new RTCPeerConnection(peerConfigConnections)

  localVideo.current.srcObject.getTracks().forEach(track=>pc.current.addTrack(track,localVideo.current.srcObject))  

  pc.current.ontrack = (event)=>{
    console.log("event peer media ==>",event)
    remoteVideo.current.srcObject = event.streams[0]
  }
  pc.current.onicecandidate= (event)=>{
    console.log("check the event to ice candidate ==>",event)
    if(event.candidate){
      socket.current.emit("signal",{
        to:peerId.current,
        data: {
        type: "candidate",
        candidate: event.candidate
      }
      })
    }
  }

}

// leave button fuction 

const leaveCall = () => {
  // 1 Notify other peer
  if (socket.current) {
    socket.current.emit("leave");
    socket.current.disconnect();
    socket.current = null;
  }

  //  Close peer connection
  if (pc.current) {
    pc.current.close();
    pc.current = null;
  }

  //  Stop local media tracks
  if (localStream.current) {
    localStream.current.getTracks().forEach(track => track.stop());
    localStream.current = null;
  }

  // Clear videos
  if (localVideo.current) localVideo.current.srcObject = null;
  if (remoteVideo.current) remoteVideo.current.srcObject = null;

  //  Reset state
  setVideoCode(true);
  setMediaReady(false);

  mediaPermission();
};

// mute 

const toggleMute = () => {
  if (!localStream.current) return;

  localStream.current.getAudioTracks().forEach(track => {
    track.enabled = !track.enabled;
    setIsMuted(!track.enabled);
  });
};

// camera 
const toggleCamera = () => {
  if (!localStream.current) return;

  localStream.current.getVideoTracks().forEach(track => {
    track.enabled = !track.enabled;
    setIsCameraOff(!track.enabled);
  });
};


  return (
    <div>
  
{videoCode == true ?  <div>
        <h2>Enter into Lobby</h2>
        <input type="text"  />
       <button onClick={connectVideo} disabled={!mediaReady}>
  {mediaReady ? "Connect" : "Loading camera..."}
</button>
        <br />
        <video ref={localVideo} autoPlay muted></video>
        <br />
        <button onClick={toggleMute}>
  {isMuted ? "Unmute Mic" : "Mute Mic"}
</button>
<button onClick={toggleCamera}>
  {isCameraOff ? "Turn Camera ON" : "Turn Camera OFF"}
</button>
      </div> :
       <div>
        <h2>current user</h2>
        <video ref={localVideo} autoPlay muted></video>
        <h2>remote video</h2>
        <video ref={remoteVideo} autoPlay></video>
        <br />
        <button onClick={leaveCall} style={{ background: "red", color: "white" }}>
  Leave Call
</button>
<button onClick={toggleMute}>
  {isMuted ? "Unmute Mic" : "Mute Mic"}
</button>
<button onClick={toggleCamera}>
  {isCameraOff ? "Turn Camera ON" : "Turn Camera OFF"}
</button>
      </div>
}
     
     
    
    </div>
  )
}

export default VideoMeet