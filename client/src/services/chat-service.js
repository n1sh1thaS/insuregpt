import axios from "axios";

export const getChatCompletion = async (chatHistory) => {
  try {
    const res = await axios.post("http://localhost:5000/chat", {
      messages: chatHistory,
    });
    const { completion } = res.data;
    return completion;
  } catch (err) {
    throw new Error(err.message);
  }
};
