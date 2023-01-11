import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  Button,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface IBasicDialogProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  title: string;
  description: string;
  finalDecision: string;
}

export default function BasicDialog({
  open,
  handleClose,
  title,
  description,
  finalDecision,
  handleSubmit,
}: IBasicDialogProps) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Typography variant="body1" component="span">
            {`${description} `}
          </Typography>
          <Typography
            variant="body1"
            component="span"
            sx={{ mr: 1, fontWeight: "bolder", textDecoration: "underline" }}
          >
            {finalDecision}
          </Typography>
          <Typography variant="body1" component="span">
            ?
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Yes</Button>
        <Button color="error" onClick={handleClose}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
