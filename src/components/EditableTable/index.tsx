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
// import { useNavigate } from "react-router-dom";
import {  IProductMatrixDimension, IProductMatrixInput } from "../../types";
import moment from "moment";
import { useFeedbackState } from "../../redux/feedbackState";

const productDimensions: IProductMatrixDimension[] = ["cargo_space", "length", "ratio"]

export default function EditableTable() {
  const seesionState = useSessionState();
  const {
    productMatrix,
    updateProductMatrix,
    finalDecision,
    updateFinalDecision,
  } = seesionState;
  const { setIsOpen } = useFeedbackState();

  // const naviagte = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (product: string) => {
    setOpen(true);
    updateFinalDecision(product);
    console.log(seesionState);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    setIsOpen(true);
    // naviagte("/survey");
  };

  return (
    <TableContainer component={Box}>
      <Table
        sx={{ width: { xs: "100%", sm: "100%" }, m: "auto" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            {productDimensions.map((dimension, index) => (
              <TableCell key={index} align="center">
                {dimension.split("_").join(" ")}
              </TableCell>
            ))}
            <TableCell align="center">Decision</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productMatrix.map((product, index) => (
            <TableRow
              key={`${product.model} + ${index}`}
              // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {`${product.make} ${product.model}`}
              </TableCell>
              {productDimensions.map((dimension, index) => (
                <TableCell
                  key={`${product.model} + ${dimension} + ${index}`}
                  align="center"
                >
                  <EditableTableCell
                    initValue={product[dimension].value}
                    productName={product.model}
                    dimension={dimension}
                    updateProductMatrix={updateProductMatrix}
                  />
                </TableCell>
              ))}
              {/* <TableCell component="th" scope="row" align="center">
                {product.cargo_space.value > 0 && product.length.value > 0
                  ? (product.cargo_space.value / product.length.value).toFixed(
                      3
                    )
                  : ""}
              </TableCell> */}
              <TableCell component="th" scope="row" align="center">
                <Button
                  variant="contained"
                  onClick={() =>
                    handleClickOpen(`${product.make} ${product.model}`)
                  }
                >
                  Choose
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
  dimension: IProductMatrixDimension;
  updateProductMatrix: (
    model: string,
    dimension: IProductMatrixDimension,
    update: Partial<IProductMatrixInput>
  ) => void;
}

function EditableTableCell({
  initValue,
  productName,
  dimension,
  updateProductMatrix,
}: IEditableTableCellProps) {
  const { mode } = useThemeState();
  const [value, setValue] = React.useState(initValue.toString());
  const { currentQueryIndex, bingQueries, chatgptQueries, searchUnit } =
    useSessionState();

  return (
    <Box
      component="input"
      type="text"
      value={Number(value) === 0 ? "" : value}
      sx={{
        fontSize: "1rem",
        padding: 0,
        margin: 0,
        width: "50%",
        bgcolor: "transparent",
        border: "1px grey solid ",
        color: mode === "light" ? "black" : "white",
      }}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onBlur={() => {
        let queryId: string | null;
        if (currentQueryIndex === null) {
          queryId = null;
        } else {
          const queries = searchUnit === "Bing" ? bingQueries : chatgptQueries;
          queryId = queries[currentQueryIndex].queryId;
        }

        updateProductMatrix(productName, dimension, {
          value: Number(value),
          lastQueryId: queryId,
          inputTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      }}
    />
  );
}
