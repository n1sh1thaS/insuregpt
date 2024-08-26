import React, { useState } from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Message from "./Message";

const ChatContainer = () => {
  const [chatHistory, setChatHistory] = useState([]);
  //element: {"role": "user" (or assistant), "content": "this is the message"}
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
        {chatHistory.map(elem)}
        <Message
          color="primary"
          text="this is the message sent by the user to the chatbot on tuesday yayyy"
        />
        <Message
          color="default"
          text="this is the message sent by the chatbot to the user on wednesday yayyy"
          bot
        />
        <Message
          color="primary"
          text="this is the message sent by the user to the chatbot on tuesday yayyy"
        />
        <Message
          color="default"
          text="this is the message sent by the chatbot"
          bot
        />
        <Message
          color="primary"
          text="this is the message sent by the user to the chatbot on tuesday yayyy"
        />
        <Message
          color="default"
          text="this is the message sent by the chatbot"
          bot
        />
        <Message
          color="primary"
          text="this is the message sent by the user to the chatbot on tuesday yayyy"
        />
        <Message
          color="default"
          text="this is the message sent by the chatbot"
          bot
        />
        <Message
          color="primary"
          text="this is the message sent by the user to the chatbot on tuesday yayyy"
        />
        <Message
          color="default"
          text="this is the message sent by the chatbot"
          bot
        />
      </div>
      <Paper
        component="form"
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
        />
        <IconButton color="primary" sx={{ p: "10px" }}>
          <SendIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default ChatContainer;
