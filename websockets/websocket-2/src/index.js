import { WebSocketServer } from "ws";
import WebSocket from "ws";
import http from "http"

const server = http.createServer((req,res)=>{})

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const res = data;
    console.log(JSON.parse(res.toString()))
});

  console.log("connected");
});


server.listen(8080,()=>{
    console.log("server is listening on port 8080 ")
})