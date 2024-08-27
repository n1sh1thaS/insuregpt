import React, { useState, useRef, useEffect } from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Message from "./Message";
import { getChatCompletion } from "../services/chat-service";

/*
input field expand when text is larger (expands to cover bottom messages)*/

const ChatContainer = () => {
  const messageListRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);
  //element: {"role": "user" (or assistant), "content": "this is the message"}
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    messageListRef.current?.lastElementChild?.scrollIntoView();
  }, [chatHistory]);

  const sendMessage = async (event) => {
    event.preventDefault();
    try {
      //add user message to chathistory
      console.log(newMessage);
      setChatHistory([
        ...chatHistory,
        { role: "user", content: `${newMessage}` },
      ]);
      setNewMessage("");

      /*get chatcompletion based on new chat records
      const chatCompletion = await getChatCompletion(chatHistory);
      console.log(chatCompletion);

      //add chatcompletion to chat records
      setChatHistory([
        ...chatHistory,
        { role: "assistant", content: `${chatCompletion}` },
      ]);*/
    } catch (err) {
      console.log("Err!", err);
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
        <ul ref={messageListRef}>
          {chatHistory.map((elem, index) => (
            <Message key={index} text={elem["content"]} role={elem["role"]} />
          ))}
        </ul>
        {/*these are some messages for testing purposes*/}
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
