import express from "express";
import http from "http";
import WebSocket from "ws";
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

const server = http.createServer(app);       // express app으로 부터 서버 생성. (http server)

const sockets = [];     // 연결되는 socket 들을 여기에 넣는다.
const wss = new WebSocket.Server({server});   // (websocket server)
wss.on("connection",(socket)=>{
  console.log("Connected to Browser.");
  sockets.push(socket);
  socket["nickname"] = "Who";
  
  socket.on("close", ()=>{ 
    sockets.pop(socket);  // disconnected 시 pop.
    console.log("DisConnected from the Browser.");
  });

  socket.on("message", (msg)=>{
    const message = JSON.parse(msg.toString());
    console.log("json : ", message)
    switch(message.type){
      case "new_message":
        sockets.forEach((aSocket)=>aSocket.send(`${socket.nickname} : ${message.payload}`));  
        break;
      case "nickname":
        console.log(message.payload);
        socket["nickname"] = message.payload;
        break;
    }
    
  });
});

server.listen(3000, handleListen); 