import React, { useState, useRef, useEffect } from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Message from "./Message";
import { getChatCompletion } from "../services/chat-service";

/*
input field expand when text is larger (expands to cover bottom messages)*/

const ChatContainer = () => {
  const messageListRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content: "Hey! I'm here to help you file a car insurance claim.",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    messageListRef.current?.lastElementChild?.scrollIntoView();
  }, [chatHistory]);

  const sendMessage = async (event) => {
    event.preventDefault();
    try {
      const newChatHistory = [
        ...chatHistory,
        { role: "user", content: `${newMessage}` },
      ];
      setNewMessage("");

      const chatCompletion = await getChatCompletion(newChatHistory);

      setChatHistory([
        ...newChatHistory,
        { role: "assistant", content: `${chatCompletion}` },
      ]);
    } catch (err) {
      console.log("Error:", err);
    }
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
        <ul ref={messageListRef} style={{ paddingInlineStart: "0px" }}>
          {chatHistory.map((elem, index) => (
            <Message key={index} text={elem.content} role={elem.role} />
          ))}
        </ul>
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
            value={newMessage}
            onChange={(res) => {
              setNewMessage(res.target.value);
            }}
            multiline
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
