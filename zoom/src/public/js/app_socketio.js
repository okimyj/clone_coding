const socket = io();        // 알아서 socket.io 를 실행하고 서버를 찾음.
const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
let roomName = "";

room.hidden = true;
const handleMessageSubmit = (e) =>{
  e.preventDefault();
  const input = room.querySelector("#message input");
  socket.emit("new_message", roomName, input.value, (msg)=>{
    addMessage(`You : ${msg}`);
  });
  input.value = "";
};
const setRoomTitle = (roomName, userNum = 0) =>{
  const h3 = room.querySelector("h3");
  h3.innerText = `Room : ${roomName}(${userNum})`;
}
const showRoom = (roomName, joinedUserNum)=>{
  welcome.hidden = true;
  room.hidden = false;
  setRoomTitle(roomName, joinedUserNum);
  const msgForm = room.querySelector("#message");
  msgForm.addEventListener("submit", handleMessageSubmit);
};
const addMessage = (message)=>{
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
};
const handleRoomSubmit = (event)=>{
  event.preventDefault();
  const roomNameInput = form.querySelector("#roomName");
  const nicknameInput = form.querySelector("#nickname");

  socket.emit("enter_room", roomNameInput.value, nicknameInput.value, showRoom);
  roomNameInput.value = "";
};
form.addEventListener("submit", handleRoomSubmit);


socket.on("welcome", (nickname, userNum)=>{
  addMessage(`${nickname} joined!`)
  setRoomTitle(roomName, userNum);
});
socket.on("bye", (nickname, userNum)=>{
  addMessage(`${nickname} left.`)
  setRoomTitle(roomName, userNum);
});
socket.on("new_message", addMessage);
socket.on("room_change", (rooms)=>{
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";
  rooms.forEach((roomName)=>{
    const li = document.createElement("li");
    li.innerText = roomName;
    roomList.appendChild(li);
  });
});