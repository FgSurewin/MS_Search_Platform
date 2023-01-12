import React from "react";
import axios from "axios";
import { Container, Paper, Box, Stack, Button, TextField } from "@mui/material";
import MyIframe from "./MyIframe";

export default function BingSearch() {
  const [inputPrompt, setInputPrompt] = React.useState<string>("");
  const [openIframe, setOpenIframe] = React.useState<boolean>(false);
  // const [results, setResults] = useState([]);
  async function handleSearch(event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    try {
      const res = await axios.request({
        method: "GET",
        url: `https://api.bing.microsoft.com/v7.0/search?q=test`,
        headers: {
          "Ocp-Apim-Subscription-Key": import.meta.env.VITE_BING_KEY,
          Accept: "application/json",
        },
      });

      console.log(res);
      // setResults(res.data.webPages.value);
    } catch (err) {
      console.error(err);
    }
  }
  React.useEffect(() => {
    // handleSearch();
  }, []);

  return (
    <Paper
      sx={{
        // bgcolor: "#343541",
        width: "100%",
        height: "100%",
        position: "relative",
        overflowY: "auto",
      }}
    >
      <Container maxWidth="md">
        <Stack
          direction="row"
          spacing={2}
          sx={{
            textAlign: "center",
            py: 2,
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <TextField
            id="Bing-Search-Text-Field"
            label="Bing Search"
            multiline
            rows={2}
            value={inputPrompt}
            onChange={(e) => {
              setInputPrompt(e.currentTarget.value);
            }}
            sx={{ width: "100%" }}
            // defaultValue="Default Value"
          />
          <Button
            variant="contained"
            onClick={() => {
              // query_answer(inputPrompt);
              //  Remove the prompt after submit
              setInputPrompt("");
            }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              // query_answer(inputPrompt);
              //  Remove the prompt after submit
              setOpenIframe(true);
            }}
          >
            open
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              // query_answer(inputPrompt);
              //  Remove the prompt after submit
              setOpenIframe(false);
            }}
          >
            close
          </Button>
        </Stack>
      </Container>
      <Box
        // className="iframe-container"
        sx={{
          width: "80%",
          height: "90%",
          m: "auto",
          position: "relative",
        }}
      >
        {/* <Box
          sx={{
            width: "100%",
            height: "100%",
            zIndex: 10,
            position: "absolute",
          }}
        /> */}
        {/* <Box
          component="iframe"
          src="https://cheerio.js.org/"
          sx={{
            display: openIframe ? "block" : "none",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        /> */}
        {openIframe && <MyIframe url="https://cheerio.js.org/" />}
      </Box>
    </Paper>
  );
}
