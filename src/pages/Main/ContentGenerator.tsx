import React from "react";
import { Box, Typography } from "@mui/material";

export default function ContentGenerator({
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
        {items.slice(0, items.length - 1).map((item, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{
              display: "inline-block",
              // textDecoration: "underline",
              // border: "1px solid black",
              // pr: 1,
              // fontWeight: "bolder",
            }}
            component="span"
          >
            the <b>{item}</b>
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
          sx={{
            display: "inline-block",
            // textDecoration: "underline",
            pl: 0.5,
            // fontWeight: "bolder",
            // border: "1px solid black",
          }}
          component="span"
        >
          the <b>{items[items.length - 1]}</b>
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
