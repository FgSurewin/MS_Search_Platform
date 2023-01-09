import React from "react";
import {
  Container,
  Stack,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ConsentPage() {
  const [checked, setChecked] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Stack
        sx={{ mt: 2, p: 4, width: "100%" }}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h3" sx={{ p: 4 }}>
          Title
        </Typography>
        <Typography variant="body1" sx={{ p: 4 }}>
          Placeholder...
        </Typography>
        <FormControlLabel
          control={<Checkbox checked={checked} />}
          label="Click here to confirm you understand the terms."
          sx={{ pb: 2 }}
          onClick={() => setChecked(!checked)}
        />
        <Button
          variant="contained"
          disabled={!checked}
          onClick={() => navigate("/main")}
        >
          Cotinue
        </Button>
      </Stack>
    </Container>
  );
}
