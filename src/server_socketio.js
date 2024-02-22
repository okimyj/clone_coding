import express from "express";
import http from "http";
import WebSocket from "ws";
import SocketIO from "socket.io";

const app = express();

// view engine 을 pug로 설정.
app.set("view engine", "pug");

// express 에 template이 어디에 있는지 지정.
app.set("views", __dirname + "/views");

// public url 생성 및 유저에게 파일 공유. 
app.use("/public", express.static(__dirname + "/public"));

// route. / 로 들어오면 home 을 그려준다.  // home.pug를 렌더링 해주는 route handler.
app.get("/", (_, res)=>res.render("home"));
app.get("/*", (_, res)=>res.redirect("/"));   // 유저가 /가 아닌 다른 경로로 진입한 경우 /로 보내버림.

const handleListen = ()=> console.log("Listening on http://localhost:3000");
// app.listen(3000, handleListen);

const httpServer = http.createServer(app);       // express app으로 부터 서버 생성. (http server)
const wsServer = SocketIO(httpServer);

const publicRooms = ()=>{
  const {sockets:{adapter:{sids, rooms}}} = wsServer;
  const publicRooms = [];
  rooms.forEach((_, key)=>{
    if(!sids.get(key))
      publicRooms.push(key);
  });
  return publicRooms;
};
const joinedUserNum = (roomName) =>{
  console.log("joinedUserNum - ")
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
};
wsServer.on("connection", (socket)=>{
  socket.nickname = "Someone"
  socket.onAny((event) =>{
    console.log(`Socket Event : ${event}`);
  });
  console.log(socket);
  socket.on("enter_room", (roomName, nickname, callback)=>{
    socket.nickname = nickname;
    socket.join(roomName);
    const userNum = joinedUserNum(roomName);
    callback?.(roomName, userNum);
    socket.to(roomName).emit("welcome", socket.nickname, userNum);      // 자기 자신에게는 메세지가 전송되지 않는다.
    wsServer.sockets.emit("room_change", publicRooms());
  });
  
  socket.on("new_message", (roomName, msg, callback)=>{
    console.log("new_message : ", msg);
    socket.to(roomName).emit("new_message", `${socket.nickname} : ${msg}`);
    callback?.(msg);
  });
  socket.on("disconnecting", ()=>{
    socket.rooms.forEach(room => socket.to(room).emit("bye", socket.nickname, joinedUserNum(room)-1));
    
  });
  socket.on("disconnect", ()=>{
    wsServer.sockets.emit("room_change", publicRooms());
  });
});
// const wsServer = new WebSocket.Server({server: httpServer});   // (websocket server)
// wsServer.on("connection",(socket)=>{
//   socket.on("message", (msg)=>{
//     console.log(msg.toString());
//   });
// });

httpServer.listen(3000, handleListen); 