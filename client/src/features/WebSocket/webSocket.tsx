import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { Box, Button, TextField } from "@mui/material";
import "./webSocket-style.css";
import { useAppSelector } from "../../redux/store";
import { toast } from "react-toastify";
interface Props {
  getMessage: ((username: string, message: string) => void) | null;
  getComment: ((username: string, message: string) => void) | null;
}

const WebSocket = ({ getMessage, getComment }: Props) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const selector = useAppSelector((state) => state.auth);
  const currentUser = selector.user?.username;
  const [currentMsg, setCurrentMsg] = useState("");

  const onChange = (event: any) => {
    setCurrentMsg(event.target.value);
  };
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl("http://localhost:5030/chat", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      if (connection.state === signalR.HubConnectionState.Disconnected) {
        connection.start().then(() => {
          connection.on(
            "ReceiveMessage",
            async (username: string, msg: string) => {
              getMessage && (await getMessage(username, msg));
            }
          );
          connection.on(
            "ReceiveComment",
            async (username: string, msg: string) => {
              getComment && (await getComment(username, msg));
            }
          );
        });
      }
    }
  }, [connection, getMessage]);
  const sendMessage = (username: string, message: string) => {
    if (connection) {
      if (getMessage) connection.invoke("SendMessage", username, message);
      else if (getComment) {
        connection.invoke("WriteComment", username, message);
      }
    }
  };

  return (
    <div className="message-box">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Message"
            multiline
            maxRows={4}
            value={currentMsg}
            onChange={onChange}
          />
        </div>
      </Box>
      <Button
        variant="outlined"
        color="inherit"
        onClick={async (event) => {
          event.stopPropagation();
          if (!selector.user) {
            toast.warning("You dont have account");
            return;
          }
          currentUser && (await sendMessage(currentUser, currentMsg));
          setCurrentMsg("");
        }}
      >
        Send
      </Button>
    </div>
  );
};

export default WebSocket;
