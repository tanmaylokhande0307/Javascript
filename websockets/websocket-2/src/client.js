const Websocket = require("ws");

const ws = new Websocket("ws://localhost:8080");

ws.on("open", () => {
  ws.send("array");
});
