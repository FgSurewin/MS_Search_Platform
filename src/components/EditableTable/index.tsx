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
} from "@mui/material";
import { useSessionState } from "../../redux/sessionState";
import { useThemeState } from "../../redux/themeState";
import BasicDialog from "../Dialog/BasicDialog";
import { useNavigate } from "react-router-dom";

export default function EditableTable() {
  const {
    selectedDimensions,
    userInputs,
    updateUserInputs,
    finalDecision,
    updateFinalDecision,
  } = useSessionState();

  const naviagte = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (product: string) => {
    setOpen(true);
    updateFinalDecision(product);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    naviagte("/survey");
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
              <TableCell key={index} align="center">
                {dimension}
              </TableCell>
            ))}
            <TableCell>Ratio</TableCell>
            <TableCell>Decision</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userInputs.map((product, index) => (
            <TableRow
              key={`${product.model} + ${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.model}
              </TableCell>
              {selectedDimensions.map((dimension, index) => (
                <TableCell
                  key={`${product.model} + ${dimension} + ${index}`}
                  align="right"
                >
                  <EditableTableCell
                    initValue={product[dimension]}
                    productName={product.model}
                    dimension={dimension}
                    updateUserInputs={updateUserInputs}
                  />
                </TableCell>
              ))}
              <TableCell component="th" scope="row">
                {product.cargo_space > 0 && product.length > 0
                  ? product.cargo_space / product.length
                  : 0}
              </TableCell>
              <TableCell component="th" scope="row">
                <Button
                  variant="contained"
                  onClick={() => handleClickOpen(product.model)}
                >
                  Buy
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <BasicDialog
        open={open}
        handleClose={handleClose}
        title="Confirmation"
        description="Have you decided to buy"
        finalDecision={finalDecision}
        handleSubmit={handleSubmit}
      />
    </TableContainer>
  );
}

export interface IEditableTableCellProps {
  initValue: string | number;
  productName: string;
  dimension: string;
  updateUserInputs: (
    productName: string,
    dimension: string,
    newValue: string
  ) => void;
}

function EditableTableCell({
  initValue,
  productName,
  dimension,
  updateUserInputs,
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
        updateUserInputs(productName, dimension, value);
      }}
    />
  );
}
