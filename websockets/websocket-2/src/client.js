import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => {
  const data = { type: "greeting", message: "Hello, server!" };
  ws.send(JSON.stringify(data));
});
