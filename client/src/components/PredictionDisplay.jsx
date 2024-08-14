import React from "react";
import { Paper, Box } from "@mui/material";
const PredictionDisplay = ({ quote }) => {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={4} square={false}>
        <p style={{ fontSize: "40px", textAlign: "center", margin: 50 }}>
          {`$${quote.toFixed(2)} `}
          <span style={{ fontSize: "25px" }}>{`per month`}</span>
        </p>
      </Paper>
    </Box>
  );
};

export default PredictionDisplay;
