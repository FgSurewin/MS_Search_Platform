import React from "react";
import { Box, Typography } from "@mui/material";

export interface IAttentionGeneratorProps {
  rowNumber: number;
  text: string;
}

export default function AttentionGenerator({
  rowNumber,
  text,
}: IAttentionGeneratorProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="subtitle1"
        component="p"
        sx={{ fontWeight: "bolder" }}
      >
        Attention {rowNumber}:
      </Typography>
      <Typography variant="body1" component="p">
        {text}
      </Typography>
    </Box>
  );
}
