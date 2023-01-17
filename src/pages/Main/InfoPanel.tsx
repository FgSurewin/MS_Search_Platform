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
    <Stack sx={{ p: 4 }} direction="column">
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bolder" }}>
        Scenario Information:
      </Typography>
      <ContentGenerator
        pretext="You are interested in"
        items={selectedDimensions.map((dimension) =>
          dimension.replace("_", " ")
        )}
        conjunction="and"
        end="."
      />
      <ContentGenerator
        pretext="Which product should you choose:"
        items={groundTruth.map(
          (product) => `${product.make} ${product.model}- (${product.trim})`
        )}
        conjunction="or"
        end="?"
      />
      <Box sx={{ mt: 4 }}>
        {attentionText.map((text, index) => (
          <AttentionGenerator
            key={index}
            rowNumber={text.rowNumber}
            text={text.text}
          />
        ))}
      </Box>
    </Stack>
  );
}

