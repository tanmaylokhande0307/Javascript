import { WebSocketServer } from "ws";
import WebSocket from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const res = data;
    console.log(JSON.parse(res.toString()))
});

  console.log("connected");
});
