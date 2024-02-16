const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#messageForm");
const nicknameForm = document.querySelector("#nicknameForm");
const socket = new WebSocket(`ws://${window.location.host}`);
const makeMessage = (type, payload) =>{
  const msg = {type, payload};
  return JSON.stringify(msg);
}
const pushChatLine = (message) =>{
  const li = document.createElement("li");
  li.innerText = message;
  messageList.append(li);
}
socket.addEventListener("open", ()=>{
  console.log("Connected to Serer.");
})
socket.addEventListener("message", (message)=>{
  console.log("receive message : ", message);
  pushChatLine(message.data);
});
socket.addEventListener("close", ()=>{
  console.log("Disconnected from Server.");
});

const handleMessageSubmit = (event)=>{
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  pushChatLine(`You : ${input.value}`);
  input.value = "";
};
const handleNicknameSubmit = (event)=>{
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
};

messageForm.addEventListener("submit", handleMessageSubmit);
nicknameForm.addEventListener("submit", handleNicknameSubmit)