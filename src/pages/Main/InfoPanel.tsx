import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import ContentGenerator from "./ContentGenerator";
import AttentionGenerator from "./AttentionGenerator";
import { attentionText } from "./data";
import { useSessionState } from "../../redux/sessionState";

// const products = ["product1", "product2", "product3", "product4", "product5"];
// const dimensions = ["cargo space", "length"];

export default function InfoPanel() {
  const { selectedDimensions, groundTruth } = useSessionState();
  return (
    <Stack sx={{ px: 4, mb: 1 }} direction="column">
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bolder" }}>
        Task 1 of 5:
      </Typography>
      {/* <Typography variant="h5" sx={{ mb: 2, fontWeight: "bolder" }}>
        Scenario Information:
      </Typography> */}
      {/* <ContentGenerator
        pretext="You are interested in"
        items={selectedDimensions.map((dimension) =>
          dimension.replace("_", " ")
        )}
        conjunction="and"
        end="."
      /> */}
      <ContentGenerator
        pretext="You are making a choice between the "
        items={groundTruth.map(
          (product) => `2020 ${product.make} ${product.model}`
        )}
        conjunction="or"
        end="?"
      />
      <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
        Your goal is to choose the SUV that has the{" "}
        <b>largest amount of total cargo space for its length</b>. In other
        words, you want to compare the ratio of{" "}
        <b>total cargo space / total length</b> and{" "}
        <b>choose the SUV with the larger ratio.</b>
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        By <b>total cargo space</b> we mean the maximum amount of space behind
        the driver’s seat (i.e., with all other rows folded down). This is
        typically measured in cubic feet.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        By <b>total length</b> we mean the exterior length of the SUV from the
        front to back of the car. This is typically measured in inches.
      </Typography>
      <ContentGenerator
        pretext="Which has the larger total cargo space to total length ratio, the "
        items={groundTruth.map(
          (product) => `2020 ${product.make} ${product.model}`
        )}
        conjunction="or"
        end="?"
      />
      {/* <Box sx={{ mt: 4 }}>
        {attentionText.map((text, index) => (
          <AttentionGenerator
            key={index}
            rowNumber={text.rowNumber}
            text={text.text}
          />
        ))}
      </Box> */}
    </Stack>
  );
}

