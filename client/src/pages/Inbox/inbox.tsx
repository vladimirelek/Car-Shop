import { useEffect, useState } from "react";
import agent from "../../api/agent";
import WebSocket from "../../features/WebSocket/webSocket";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import "./inbox-style.css";
import { Message } from "../../models/models";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { setMessages } from "../../features/Auth/authSlice";
const Inbox = () => {
  const [brojac, setBrojac] = useState<number>(0);
  const selector1 = useAppSelector((state) => state.auth);
  const userId = selector1.user?.id;
  const dispatch = useAppDispatch();
  useEffect(() => {
    userId &&
      agent.Auth.getAllMessages(userId)
        .then((item) => {
          setMessages(item.messages);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);
  const onDelete = async (messageId: number) => {
    if (selector1.user?.id) {
      agent.Auth.deleteMessage(selector1.user?.id, messageId)
        .then((item) => {
          dispatch(setMessages(item.messages));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getMessage = async (sentFrom: string, messageContent: string) => {
    console.log(sentFrom, messageContent);
    if (userId) {
      await agent.Auth.addMessageToUser({
        sentFrom,
        messageContent,
      }).catch((error) => {
        console.log(error);
      });
      await agent.Auth.getAllMessages(userId)
        .then((item) => {
          dispatch(setMessages(item.messages));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      {selector1.user?.roles.includes("Admin") && (
        <div className="sendMessageToAllClients">
          <p>Send notification to all clients</p>
          <WebSocket getMessage={getMessage} getComment={null} />
        </div>
      )}
      {selector1.user?.roles.includes("Member") && (
        <div className="inbox">
          {selector1.user &&
            selector1.user.messages.map((item) => {
              return (
                <div className="message">
                  <h1>
                    <AccountCircleIcon />
                    {item.sentFrom}
                  </h1>
                  <div>
                    <h3> {item.messageContent}</h3>
                    <DeleteIcon
                      onClick={() => {
                        onDelete(item.messageId);
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
export default Inbox;
