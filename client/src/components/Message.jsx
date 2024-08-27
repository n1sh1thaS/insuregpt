import React from "react";
import { Box, Chip } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

const Message = (props) => {
  const { text, role } = props;
  return (
    <>
      <Box
        display="flex"
        justifyContent={role === "assistant" ? "flex-start" : "flex-end"}
      >
        <Chip
          sx={{
            margin: "1%",
            padding: "1%",
            width: "fit-content",
            maxWidth: "50%",
            height: "auto",
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
            },
          }}
          color={role === "assistant" ? "default" : "primary"}
          icon={role === "assistant" ? <FaceIcon /> : null}
          label={text}
        />
      </Box>
    </>
  );
};

export default Message;
