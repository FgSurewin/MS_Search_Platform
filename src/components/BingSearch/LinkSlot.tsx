import React from "react";
import { Card, CardHeader, CardContent, Button } from "@mui/material";

export interface ILinkSlot {
  title: string;
  snippet: string;
  handleLinkClick: () => void;
}

export default function LinkSlot({
  title,
  snippet,
  handleLinkClick,
}: ILinkSlot) {
  return (
    <Card sx={{ m: 2 }}>
      <CardHeader
        title={title}
        action={
          <Button
            variant="outlined"
            aria-label="bing_link"
            onClick={() => {
              handleLinkClick();
            }}
          >
            Visit
          </Button>
        }
      />
      <CardContent>{snippet}</CardContent>
    </Card>
  );
}
