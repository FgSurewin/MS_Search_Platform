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
  finalDecision: string;
}

export default function BasicDialog({
  open,
  handleClose,
  title,
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
            You selected the 2020 <b>{finalDecision}</b>. Please confirm that
            this is the option with the larger total cargo space to total length
            ratio.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Confirm</Button>
        <Button color="error" onClick={handleClose}>
          Go back
        </Button>
      </DialogActions>
    </Dialog>
  );
}
