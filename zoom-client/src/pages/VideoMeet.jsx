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
  const pc = useRef(null)
  const peerId = useRef(null)

  const mediaPermission = async ()=>{
    const stream = await navigator.mediaDevices.getUserMedia({
      video:true,
      audio:true
    })
    localVideo.current.srcObject = stream
  }
 useEffect(()=>{
  mediaPermission()
 },[])

 const connectVideo = ()=>{
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
 }
const createPeer = ()=>{
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



  return (
    <div>
  
      <div>
        <h2>Enter into Lobby</h2>
        <input type="text"  />
        <button onClick={connectVideo} >Connect</button>
        <br />
        <video ref={localVideo} autoPlay muted></video>
      </div>
      <div>
        <h2>remote video</h2>
        <video ref={remoteVideo} autoPlay></video>
      </div>
    
    </div>
  )
}

export default VideoMeet