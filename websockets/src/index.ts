import Websocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer(function (request: any, response: any) {
  console.log(new Date() + "Received request for " + request.url);
  response.end("Hi there");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (data, isBinary) => {
    wss.clients.forEach(function each(client) {
      if (client.readyState === Websocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send("Hello!! Message from server");
});

server.listen(8080, function () {
  console.log("server is listening on port", +8080);
});
