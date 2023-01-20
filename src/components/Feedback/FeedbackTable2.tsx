import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { useSessionState } from "../../redux/sessionState";
import { IProduct, IProductMatrixDimension } from "../../types";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const productDimensions: IProductMatrixDimension[] = [
  "cargo_space",
  "length",
  "ratio",
];

export default function FeedbackTable() {
  const { groundTruth } = useSessionState();
  return (
    <TableContainer component={Box}>
      <Table
        sx={{ width: { xs: "100%", sm: "80%" }, m: "auto", mt: 2 }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bolder" }}>Product</TableCell>
            {productDimensions.map((dimension, index) => (
              <TableCell
                key={index}
                align="center"
                sx={{ fontWeight: "bolder" }}
              >
                {dimension.split("_").join(" ")}
              </TableCell>
            ))}
            <TableCell sx={{ fontWeight: "bolder" }} align="center">
              Decision
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groundTruth.map((product, index) => (
            <TableRow key={`${product.model} + ${index}`}>
              <TableCell component="th" scope="row">
                {`${product.make} ${product.model}`}
              </TableCell>
              {productDimensions.map((dimension, index) => (
                <TableCell
                  key={`finalDecision${product.model} + ${dimension} + ${index}`}
                  align="center"
                  sx={{ fontWeight: "bolder" }}
                >
                  {product[dimension]}
                </TableCell>
              ))}
              {product.model === makeDecision(groundTruth).model ? (
                <TableCell component="th" scope="row" align="center">
                  <DirectionsCarIcon sx={{ color: "green" }} />
                </TableCell>
              ) : (
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                ></TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function makeDecision(groundTruth: IProduct[]) {
  let result;
  if (groundTruth[0].ratio >= groundTruth[1].ratio) {
    result = groundTruth[0];
  } else {
    result = groundTruth[1];
  }
  return result;
}
