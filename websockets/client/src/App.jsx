import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket";

const Chat = ({ roomId, userName }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleMessage = (event) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (error) {
        console.log(error);
      }

      if (data.type === "message") {
        console.log("message received");
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [roomId, userName]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div
        className={`w-[600px] border-2 flex flex-col h-[300px] overflow-y-auto`}
      >
        {messages.map((message, idx) => {
          return (
            <p
              key={idx}
              className={`${
                message.userName === userName
                  ? "self-end text-green-500"
                  : "self-start text-red-500"
              } `}
            >
              {message.message}
            </p>
          );
        })}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={() =>
            socket.send(
              JSON.stringify({
                type: "message",
                roomId: roomId,
                userName,
                message,
              })
            )
          }
        >
          Send
        </button>
      </div>
    </div>
  );
};

function App() {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const joinRoom = () => {
      socket.send(
        JSON.stringify({
          type: "join",
          roomId: roomId,
          userName,
        })
      );
    };

    if (socket.readyState === WebSocket.OPEN) {
      joinRoom();
    } else {
      socket.addEventListener("open", joinRoom);
    }

    return () => {
      socket.removeEventListener("open", joinRoom);
    };
  }, []);

  return (
    <>
      <input
        type="text"
        className="border-2"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="roomId"
      />
      <input
        type="text"
        className="border-2"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="username"
      />

      <button
        onClick={() =>
          socket.send(
            JSON.stringify({
              type: "join",
              roomId: "room1",
              userName,
            })
          )
        }
      >
        Connect
      </button>

      <Chat userName={userName} roomId={roomId} />
    </>
  );
}

export default App;
