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

export interface ISurveyDialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  code: string;
}

export default function SurveyDialog({
  open,
  handleClose,
  title,
  code,
}: ISurveyDialogProps) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-slide-description">
          <Typography variant="body1" component="span">
            Congrats! You have already completed all the tasks. Please copy the
            survey code below and paste it in the survey form. Once you have
            submitted the survey, you can click the button below to close this
            page.
          </Typography>
          <Typography
            variant="body1"
            component="span"
            sx={{ textAlign: "center", display: "block" }}
          >
            {code}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Close this page
        </Button>
      </DialogActions>
    </Dialog>
  );
}
