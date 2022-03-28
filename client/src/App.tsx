import { DefaultEventsMap } from "@socket.io/component-emitter";
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import io, { Socket } from "socket.io-client";
import ConnectedUsers from "./component/connectedUsers/ConnectedUsers";
import EnterUsername from "./component/EnterUsername";
import MessageGrp from "./component/message/Messages";
export type userType = { id: string; username: string };
const App = () => {
  const [connected, setConnected] = useState(false);
  const [myUsername, setMyUsername] = useState("");
  const [connectedUsers, setConnectedUser] = useState([] as userType[]);
  const [messages, setMessages] = useState(
    [] as { message: string; username: string }[]
  );
  const [myMessage, setMyMessage] = useState("");
  const socketClient = useRef<Socket>();

  useEffect(() => {
    socketClient.current = io("http://localhost:5000");

    if (socketClient.current) {
      socketClient.current.on("username-submitted-successfully", () => {
        setConnected(true);
      });

      socketClient.current.on("username-taken", () => {
        toast.error("User is taken");
      });

      socketClient.current.on(
        "get-connected-users",
        (connectedUsers: userType[]) => {
          setConnectedUser(
            connectedUsers.filter((user) => user.username !== myUsername)
          );
        }
      );

      socketClient.current.on(
        "receive-message",
        (newMessage: { message: string; username: string }) => {
          setMessages((prev) => [...prev, newMessage]);
          console.table(newMessage);
        }
      );
    }
  }, [myUsername]);

  const handleConnection = () => {
    if (socketClient.current) {
      socketClient.current.emit("handle-connection", myUsername);
    }
  };

  const handleSendMessage = () => {
    if (socketClient.current) {
      if (myMessage !== "") {
        setMessages((prev) => [
          ...prev,
          { message: myMessage, username: myUsername },
        ]);
        socketClient.current.emit("message", { myMessage, myUsername });
        setMyMessage("");
      }
    }
  };
  return (
    <div className="app">
      {!connected && (
        <div className="enter-username-form">
          <EnterUsername {...{ myUsername, setMyUsername, handleConnection }} />
        </div>
      )}

      {connected && (
        <>
          <ConnectedUsers connectedUsers={connectedUsers} />
          <MessageGrp
            message={myMessage}
            setMessage={setMyMessage}
            messages={messages}
            username={myUsername}
            handleSendMessage={handleSendMessage}
          />
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
