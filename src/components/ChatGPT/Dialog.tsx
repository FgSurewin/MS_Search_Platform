import React from "react";
import { Stack, Box, Divider, Typography } from "@mui/material";

export interface IDialogProps {
  question: string;
  answer: string;
  answerProbs: string;
  top_logprobs: { [key: string]: number }[];
}

export default function Dialog({ question, answer }: IDialogProps) {
  return (
    <Stack sx={{ bgcolor: "#a0a0a0", width: "100%", my: 4, px: 4 }}>
      <Box
        component={Stack}
        direction="row"
        spacing={4}
        sx={{ py: 2 }}
        justifyContent="flex-start"
      >
        <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
          You:
        </Typography>
        <Typography variant="body1">{question}</Typography>
      </Box>
      <Divider />
      <Box
        component={Stack}
        direction="row"
        spacing={4}
        sx={{ py: 2 }}
        justifyContent="flex-start"
      >
        <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
          Bot:
        </Typography>
        <Typography variant="body1">{answer}</Typography>
      </Box>
      {/* <Divider />
      <Box
        component={Stack}
        direction="row"
        spacing={4}
        sx={{ py: 2 }}
        justifyContent="flex-start"
      >
        <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
          Bot:
        </Typography>
        <Typography variant="body1">{answerProbs}</Typography>
      </Box> */}
      {/* <Box>
        <Divider />
        <Box>Inspector</Box>
      </Box> */}
    </Stack>
  );
}
