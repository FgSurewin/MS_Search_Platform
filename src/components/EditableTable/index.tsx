import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useSessionState } from "../../redux/sessionState";
import { useThemeState } from "../../redux/themeState";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditableTable() {
  const {
    selectedDimensions,
    selectedProducts,
    updateSelectedProducts,
    finalDecision,
    updateFinalDecision,
  } = useSessionState();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (product: string) => {
    setOpen(true);
    updateFinalDecision(product);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableContainer component={Box}>
      <Table
        sx={{ width: { xs: "100%", sm: "80%" }, m: "auto", mt: 6 }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            {selectedDimensions.map((dimension, index) => (
              <TableCell key={index} align="right">
                {dimension}
              </TableCell>
            ))}
            <TableCell>Decision</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedProducts.map((product, index) => (
            <TableRow
              key={`${product.name} + ${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              {selectedDimensions.map((dimension, index) => (
                <TableCell
                  key={`${product.name} + ${dimension} + ${index}`}
                  align="right"
                >
                  <EditableTableCell
                    initValue={product[dimension]}
                    productName={product.name}
                    dimension={dimension}
                    updateSelectedProducts={updateSelectedProducts}
                  />
                </TableCell>
              ))}
              <TableCell component="th" scope="row">
                <Button
                  variant="contained"
                  onClick={() => handleClickOpen(product.name)}
                >
                  Buy
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Have you decided to buy ${finalDecision}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Yes</Button>
          <Button color="error" onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

export interface IEditableTableCellProps {
  initValue: string | number;
  productName: string;
  dimension: string;
  updateSelectedProducts: (
    productName: string,
    dimension: string,
    newValue: string
  ) => void;
}

function EditableTableCell({
  initValue,
  productName,
  dimension,
  updateSelectedProducts,
}: IEditableTableCellProps) {
  const { mode } = useThemeState();
  const [value, setValue] = React.useState(initValue.toString());

  return (
    <Box
      component="input"
      type="text"
      value={value}
      sx={{
        fontSize: "1rem",
        padding: 0,
        margin: 0,
        border: 0,
        width: "50%",
        bgcolor: "transparent",
        color: mode === "light" ? "black" : "white",
      }}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onBlur={() => {
        updateSelectedProducts(productName, dimension, value);
      }}
    />
  );
}
