import React from "react";
import { Box, Stack, Typography } from "@mui/material";

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
    <Stack sx={{ p: 2 }} direction="column">
      <Typography variant="h5">Scenario Information:</Typography>
      <ContentGenerator
        pretext="You are interested in"
        items={dimensions}
        conjunction="and"
        end="."
      />
      <ContentGenerator
        pretext="Which should you choose"
        items={products}
        conjunction="or"
        end="?"
      />
    </Stack>
  );
}

// Helper functions
function ContentGenerator({
  pretext,
  items,
  conjunction,
  end,
}: {
  pretext: string;
  items: string[];
  conjunction: string;
  end: string;
}) {
  return (
    <Box>
      <Typography variant="body1" component="p">
        {`${pretext} `}
        {items.slice(0, products.length - 1).map((item, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{ display: "inline-block", textDecoration: "underline", pr: 1 }}
            component="span"
          >
            {item}
            <Typography
              variant="body1"
              sx={{ display: "inline-block" }}
              component="span"
            >
              ,
            </Typography>
          </Typography>
        ))}
        <Typography
          variant="body1"
          sx={{ display: "inline-block" }}
          component="span"
        >
          {conjunction}
        </Typography>
        <Typography
          variant="body1"
          sx={{ display: "inline-block", textDecoration: "underline", pl: 1 }}
          component="span"
        >
          {items[items.length - 1]}
        </Typography>
        <Typography
          variant="body1"
          sx={{ display: "inline-block" }}
          component="span"
        >
          {end}
        </Typography>
      </Typography>
    </Box>
  );
}
