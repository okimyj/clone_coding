const socket = io();        // 알아서 socket.io 를 실행하고 서버를 찾음.

const myFace = document.getElementById("myFace");
let myStream;
const getMedia = async()=>{
   try{
    myStream = await navigator.mediaDevices.getUserMedia(
      {
        audio:true,
        video:true
      }
    );
    myFace.srcObject = myStream;
    console.log("myStream : ", myStream);
   }catch(e){
    console.log("getMedia catch - ", e);
   }
};
getMedia();