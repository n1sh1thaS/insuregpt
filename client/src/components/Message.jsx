import React from "react";
import { Box, Chip } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

const Message = (props) => {
  const { color, text, bot } = props;
  return (
    <>
      <Box
        display="flex"
        justifyContent={bot === true ? "flex-start" : "flex-end"}
      >
        <Chip
          sx={{
            margin: "2%",
            padding: "1%",
            maxWidth: "50%",
            height: "auto",
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
            },
          }}
          color={color}
          icon={bot && <FaceIcon />}
          label={text}
        />
      </Box>
    </>
  );
};

export default Message;
