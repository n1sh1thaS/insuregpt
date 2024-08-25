import { useState } from "react";
import PredictionForm from "./components/PredictionForm";
import ChatContainer from "./components/ChatContainer";
import { Box } from "@mui/material";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Box display="flex" flexDirection="row" gap={5}>
      <PredictionForm />
      <ChatContainer />
    </Box>
  );
}

export default App;
