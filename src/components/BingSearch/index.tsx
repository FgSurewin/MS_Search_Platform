import React from "react";
import axios from "axios";
import { Container, Box, Stack, Button, TextField } from "@mui/material";
import MyIframe from "./MyIframe";
import { IBingSearchResonse, IWebPageValue } from "../../types";
import LinkSlot from "./LinkSlot";
// import { useIframeState } from "../../redux/iframeState";

export default function BingSearch() {
  const [inputPrompt, setInputPrompt] = React.useState<string>("");
  const [results, setResults] = React.useState<IWebPageValue[]>([]);
  const [openIframe, setOpenIframe] = React.useState<boolean>(false);
  const [iframeUrl, setIframeUrl] = React.useState<string>("");

  // const { show, setShow, url, setUrl } = useIframeState();

  // Handle bing search
  async function handleSearch(input: string) {
    // event?.preventDefault();

    try {
      const res = await axios.request<IBingSearchResonse>({
        method: "GET",
        url: `https://api.bing.microsoft.com/v7.0/search`,
        params: {
          q: input,
          count: "30",
        },
        headers: {
          "Ocp-Apim-Subscription-Key": import.meta.env.VITE_BING_KEY,
          Accept: "application/json",
        },
      });

      // console.log(res.data);
      setResults(res.data.webPages.value);
    } catch (err) {
      console.error(err);
    }
  }

  // Handle link click
  function handleLinkClick(url: string) {
    console.log("Parent Clicking");

    setOpenIframe(true);
    setIframeUrl(url);
  }

  return (
    <Box
      sx={{
        // bgcolor: "#343541",
        width: "100%",
        height: "100%",
        position: "relative",
        // overflowY: "auto",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            textAlign: "center",
            py: 2,
            // position: "absolute",
            top: 0,
            zIndex: 1,
            mb: 2,
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
              handleSearch(inputPrompt);
              //  Remove the prompt after submit
              setInputPrompt("");
            }}
          >
            Submit
          </Button>

          {openIframe && (
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setOpenIframe(false);
              }}
            >
              close
            </Button>
          )}
        </Stack>
        <Stack>
          {results.length > 0 &&
            results.map((result) => (
              <LinkSlot
                key={result.id}
                title={result.name}
                handleLinkClick={() => {
                  handleLinkClick(result.url);
                }}
                snippet={result.snippet}
              />
            ))}
        </Stack>
      </Container>
      <Box
        // className="iframe-container"
        id="iframe-container"
        sx={{
          width: "80%",
          height: "90%",
          m: "auto",
          // position: "relative",
        }}
      >
        {openIframe && iframeUrl !== "" && <MyIframe url={iframeUrl} />}
      </Box>
    </Box>
  );
}
