import React from "react";
import { Box, Typography, TextField } from "@mui/material";

export interface IOpenEndProps {
  questionNumber: number;
  question: string;
}

export default function OpenEnd({ question, questionNumber }: IOpenEndProps) {
  return (
    <Box sx={{ mb: 2, width: "100%" }}>
      <Typography variant="h6" component="p">
        <Typography variant="h6" component="span">
          {`${questionNumber}. `}
        </Typography>
        <Typography variant="h6" component="span">
          {question}
        </Typography>
        <Typography variant="h6" component="span">
          ?
        </Typography>
      </Typography>
      <TextField
        id={`open_end_answer_${questionNumber}`}
        // label="Answer"
        multiline
        rows={4}
        placeholder="Enter your answer here..."
        sx={{ mt: 2, width: "100%" }}
      />
    </Box>
  );
}
