import { WebSocketServer } from "ws";
import WebSocket from "ws";
import http from "http";
import express from "express";

const app = express();
const httpserver = app.listen(8080, () => {
  console.log("server is listening on port 8080 ");
});

const server = http.createServer((req, res) => {});

const wss = new WebSocketServer({ server: httpserver });

const rooms = {};

const addUserToRoom = (roomId, userName, ws) => {
  if (!rooms[roomId]) {
    rooms[roomId] = new Set();
  }
  rooms[roomId].add(ws);
  ws.roomId = roomId;
  ws.userName = userName;
  ws.send(
    JSON.stringify({
      type: "message",
      message: `Connected to room ${roomId}`,
      roomId,
    })
  );
};

const removeUserFromRoom = (ws) => {
  const roomId = ws.roomId;
  if (roomId && rooms[roomId]) {
    rooms[roomId].delete(ws);
    if (rooms[roomId].size === 0) {
      delete rooms[roomId];
    }
  }
};

wss.on("connection", (ws) => {
  ws.on("message", (data, isBinary) => {
    let message;
    try {
      message = JSON.parse(data);
    } catch (error) {
      ws.send(JSON.stringify({ message: "Incorrect JSON format" }));
    }

    if (message.type === "join") {
      const roomId = message.roomId;
      const userName = message.userName;
      if (!roomId) {
        ws.send(JSON.stringify({ message: "roomId not present" }));
        return;
      }
      addUserToRoom(roomId, userName, ws);
      return;
    }

    if (message.type === "message") {
      if (!ws.roomId) {
        ws.send(JSON.stringify({ message: "roomId not present" }));
        return;
      }

      const roomId = ws.roomId;
      const userName = ws.userName;

      if (rooms[roomId]) {
        rooms[roomId].forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "message",
                roomId,
                userName,
                message: message.message,
              })
            );
          }
        });
      }
    }
  });

  ws.on("close", () => {
    removeUserFromRoom(ws);
  });

  ws.on("error", () => {
    removeUserFromRoom(ws);
  });

  console.log("connected");
});
