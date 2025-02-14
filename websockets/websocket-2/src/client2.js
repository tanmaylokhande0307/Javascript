import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => {
  const data = { roomId: "1", name: "jd",message: "Hello, server!" };
  ws.send(JSON.stringify(data));
});

ws.on("message",(data)=>{
    console.log(JSON.parse(data))
})