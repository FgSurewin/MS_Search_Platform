import React from "react";
import { Box, Typography, Stack } from "@mui/material";
// import FeedbackTable from "./FeedbackTable";
import FeedbackTable2 from "./FeedbackTable2";
import { useSessionState } from "../../redux/sessionState";
import { makeDecision } from "./FeedbackTable2";

export default function Feedback() {
  const { finalDecision, groundTruth } = useSessionState();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "100%",
          height: "100%",
          p: 2,
        }}
      >
        <Typography variant="h4">
          Congrats! You have made a decision!
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Please take a moment to check the table below to see if the
          information you have entered matches the correct information and if
          you have made the right decision.
        </Typography>
        <FeedbackTable2 />
        <Typography sx={{ mt: 4 }}>
          <Typography
            variant="subtitle1"
            component="span"
            sx={{ fontWeight: "bolder" }}
          >
            Your decision is purchasing{" "}
          </Typography>
          <Typography
            variant="subtitle1"
            component="span"
            sx={{
              fontWeight: "bolder",
              color:
                finalDecision ===
                `${makeDecision(groundTruth).make} ${
                  makeDecision(groundTruth).model
                }`
                  ? "green"
                  : "red",
            }}
          >
            {finalDecision}.{" "}
          </Typography>
          {finalDecision ===
          `${makeDecision(groundTruth).make} ${
            makeDecision(groundTruth).model
          }` ? (
            <Typography
              variant="subtitle1"
              component="span"
              sx={{ fontWeight: "bolder" }}
            >
              Congrats! You have made the right decision!
            </Typography>
          ) : (
            <Typography
              variant="subtitle1"
              component="span"
              sx={{ fontWeight: "bolder" }}
            >
              Unfortunately, you have made the wrong decision.
            </Typography>
          )}
        </Typography>
      </Stack>
    </Box>
  );
}
