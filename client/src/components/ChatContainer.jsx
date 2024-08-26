import React, { useState } from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Message from "./Message";

const ChatContainer = () => {
  const [chatHistory, setChatHistory] = useState([]);
  //element: {"role": "user" (or assistant), "content": "this is the message"}
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(newMessage);
    let newChat = chatHistory;
    newChat.push({ role: "user", content: `${newMessage}` });
    setChatHistory(newChat);
    setNewMessage("");
  };

  return (
    <div
      style={{
        width: "56%",
        height: "750px",
        border: "1px solid black",
        borderRadius: "1%",
        position: "relative",
      }}
    >
      <div
        style={{
          maxHeight: "93%",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {chatHistory.map((elem) => (
          <Message text={elem["content"]} role={elem["role"]} />
        ))}
        <Message text="this is the message sent by the user to the chatbot on tuesday yayyy" />
        <Message
          text="this is the message sent by the chatbot to the user on wednesday yayyy"
          role="assistant"
        />
        <Message text="this is the message sent by the user to the chatbot on tuesday yayyy" />
        <Message
          text="this is the message sent by the chatbot"
          role="assistant"
        />
        <Message text="this is the message sent by the user to the chatbot on tuesday yayyy" />
        <Message
          text="this is the message sent by the chatbot"
          role="assistant"
        />
        <Message text="this is the message sent by the user to the chatbot on tuesday yayyy" />
        <Message
          text="this is the message sent by the chatbot"
          role="assistant"
        />
        <Message text="this is the message sent by the user to the chatbot on tuesday yayyy" />
        <Message
          text="this is the message sent by the chatbot"
          role="assistant"
        />
      </div>
      <form onSubmit={sendMessage}>
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            position: "absolute",
            bottom: 0,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Say hello to file a claim"
            onChange={(res) => {
              setNewMessage(res.target.value);
            }}
          />
          <IconButton color="primary" type="submit" sx={{ p: "10px" }}>
            <SendIcon />
          </IconButton>
        </Paper>
      </form>
    </div>
  );
};

export default ChatContainer;
