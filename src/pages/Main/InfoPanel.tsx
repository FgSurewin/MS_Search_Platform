import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import ContentGenerator from "./ContentGenerator";
import AttentionGenerator from "./AttentionGenerator";
import { attentionText } from "./data";

const products = ["product1", "product2", "product3", "product4", "product5"];
const dimensions = [
  "dimension1",
  "dimension2",
  "dimension3",
  "dimension4",
  "dimension5",
];

export default function InfoPanel() {
  return (
    <Stack sx={{ p: 4 }} direction="column">
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bolder" }}>
        Scenario Information:
      </Typography>
      <ContentGenerator
        pretext="You are interested in"
        items={dimensions}
        conjunction="and"
        end="."
      />
      <ContentGenerator
        pretext="Which product should you choose:"
        items={products}
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

