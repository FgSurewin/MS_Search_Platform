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
  const { productMatrix, finalDecision, groundTruth } = useSessionState();
  return (
    <TableContainer component={Box}>
      <Table
        sx={{ width: { xs: "100%", sm: "80%" }, m: "auto", mt: 6 }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={2}
              rowSpan={2}
              sx={{ borderRight: "1px solid ", fontWeight: "bolder" }}
            >
              Product
            </TableCell>
            {productDimensions.map((dimension, index) => (
              <TableCell
                key={index}
                align="center"
                colSpan={2}
                sx={{ fontWeight: "bolder" }}
              >
                {dimension.split("_").join(" ")}
              </TableCell>
            ))}
            <TableCell colSpan={2} sx={{ fontWeight: "bolder" }} align="center">
              Decision
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">User Input</TableCell>
            <TableCell align="center">Rround Truth</TableCell>
            <TableCell align="center">User Input</TableCell>
            <TableCell align="center">Rround Truth</TableCell>
            <TableCell align="center">User Input</TableCell>
            <TableCell align="center">Rround Truth</TableCell>
            <TableCell align="center">User Input</TableCell>
            <TableCell align="center">Rround Truth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[0, 1].map((productIdx, index) => (
            <TableRow
              key={`${productMatrix[productIdx].model} + ${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" colSpan={2}>
                {productMatrix[productIdx].model}
              </TableCell>
              {productDimensions.map((dimension, index) => (
                <>
                  <TableCell
                    key={`productMatrix${productMatrix[productIdx].model} + ${dimension} + ${index}`}
                    align="center"
                    sx={{
                      color:
                        groundTruth[productIdx][dimension] ===
                        productMatrix[productIdx][dimension].value
                          ? "green"
                          : "red",
                      fontWeight: "bolder",
                    }}
                  >
                    {productMatrix[productIdx][dimension].value}
                  </TableCell>
                  <TableCell
                    key={`finalDecision${groundTruth[productIdx].model} + ${dimension} + ${index}`}
                    align="center"
                    sx={{ fontWeight: "bolder" }}
                  >
                    {groundTruth[productIdx][dimension]}
                  </TableCell>
                </>
              ))}
              {finalDecision === productMatrix[productIdx].model ? (
                <TableCell component="th" scope="row" align="center">
                  <DirectionsCarIcon
                    sx={{
                      color:
                        finalDecision === makeDecision(groundTruth)
                          ? "green"
                          : "red",
                    }}
                    fontSize="medium"
                  />
                </TableCell>
              ) : (
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                ></TableCell>
              )}
              {productMatrix[productIdx].model === makeDecision(groundTruth) ? (
                <TableCell component="th" scope="row" align="center">
                  <DirectionsCarIcon />
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
  let result = "";
  if (groundTruth[0].ratio >= groundTruth[1].ratio) {
    result = `${groundTruth[0].make} ${groundTruth[0].model}`;
  } else {
    result = `${groundTruth[1].make} ${groundTruth[1].model}`;
  }
  return result;
}
