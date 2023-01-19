import React from "react";
import axios from "axios";
import moment from "moment";
import LinkSlot from "./LinkSlot";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@mui/material/styles";
import { useTimeState } from "../../redux/timeState";
import { useSessionState } from "../../redux/sessionState";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IBingSearchResonse, IWebPageValue } from "../../types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Container,
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
// import MyIframe from "./MyIframe";
// import { useIframeState } from "../../redux/iframeState";

export default function BingSearch() {
  const [inputPrompt, setInputPrompt] = React.useState<string>("");
  // const [results, setResults] = React.useState<IWebPageValue[]>([]);
  const {
    currentQueryIndex,
    updateCurrentQueryIndex,
    addBingQuery,
    updateBingQuery,
    bingQueries,
    updateBingQueryLink,
  } = useSessionState();
  const {
    currentLinkId,
    linkCounting,
    linkStartTime,
    updateCurrentLinkId,
    updateLinkStartTime,
    updateLinkCounting,
  } = useTimeState();
  const theme = useTheme();
  const checkForwad = React.useMemo(() => {
    if (currentQueryIndex === null) {
      return false;
    } else if (currentQueryIndex === bingQueries.length - 1) {
      return false;
    } else {
      return true;
    }
  }, [currentQueryIndex, bingQueries]);
  const checkBack = React.useMemo(() => {
    if (currentQueryIndex === null) {
      return false;
    } else if (currentQueryIndex === 0) {
      return false;
    } else {
      return true;
    }
  }, [currentQueryIndex]);

  function handleEndPrevLink(currentTime: string) {
    if (
      currentQueryIndex !== null &&
      currentLinkId !== "" &&
      linkCounting === true &&
      linkStartTime !== ""
    ) {
      const endTime = moment(currentTime);
      const currentQuerytId = bingQueries[currentQueryIndex].queryId;
      const duration = endTime.diff(moment(linkStartTime));
      const linkInfo = bingQueries[currentQueryIndex].clickedLinks.find(
        (link) => link.linkId === currentLinkId
      );
      if (linkInfo) {
        // const checkStartTime =
        //   linkInfo.clickedTime[linkInfo.clickedTime.length - 1] ===
        //   linkStartTime;
        // console.log("checkStartTime -> " + checkStartTime);
        const newDurationArr = linkInfo.duration;
        newDurationArr[newDurationArr.length - 1] = duration;
        updateBingQueryLink(currentQuerytId, currentLinkId, {
          duration: newDurationArr,
        });
        updateCurrentLinkId("");
        updateLinkStartTime("");
        updateLinkCounting(false);
      }
    }
  }

  function handleQueryHistory(
    inputPrompt: string,
    cachedLinks: IWebPageValue[] | undefined
  ) {
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const newQueryId = uuidv4();
    //TODO handle first query
    if (currentQueryIndex === null) {
      //TODO: Add new query
      addBingQuery({
        queryId: newQueryId,
        query: inputPrompt,
        queryTime: [currentTime],
        clickedLinks: [],
        cachedLinks,
      });
      updateCurrentQueryIndex(0);
    } else {
      //TODO: End previous link
      handleEndPrevLink(currentTime);
      //TODO: Add new query
      addBingQuery({
        queryId: newQueryId,
        query: inputPrompt,
        queryTime: [currentTime],
        clickedLinks: [],
        cachedLinks,
      });
      const newQueryIndex = bingQueries.length;
      // console.log("bingQueries -> ", bingQueries);
      // console.log("newQueryIndex -> ", newQueryIndex);
      updateCurrentQueryIndex(newQueryIndex);
    }
  }

  // Handle bing search
  async function handleSearch(input: string) {
    // event?.preventDefault();

    try {
      const res = await axios.request<IBingSearchResonse>({
        method: "GET",
        url: `https://api.bing.microsoft.com/v7.0/search`,
        params: {
          q: input,
          count: "15",
        },
        headers: {
          "Ocp-Apim-Subscription-Key": import.meta.env.VITE_BING_KEY,
          Accept: "application/json",
        },
      });

      // setResults(res.data.webPages.value);
      return res.data.webPages.value;
    } catch (err) {
      console.error(err);
    }
  }

  function handleAddLinkEmptySlot(
    currentQueryIdx: number,
    currentTime: string
  ) {
    const targetQuery = bingQueries[currentQueryIdx];
    const newQueryTimeArr = targetQuery.queryTime;
    newQueryTimeArr.push(currentTime);
    const newClickedLinks = targetQuery.clickedLinks;
    newClickedLinks.forEach((link) => {
      link.clickedTime.push("");
      link.duration.push(0);
    });
    updateBingQuery(targetQuery.queryId, {
      queryTime: newQueryTimeArr,
      clickedLinks: newClickedLinks,
    });
  }

  function handleForward() {
    if (currentQueryIndex !== null && currentQueryIndex < bingQueries.length) {
      // TODO: End previous link
      const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
      handleEndPrevLink(currentTime);
      //TODO: Update query index
      const newCurrentQueryIndex = currentQueryIndex + 1;
      updateCurrentQueryIndex(newCurrentQueryIndex);
      //TODO: Add empty slot for clicked links
      handleAddLinkEmptySlot(newCurrentQueryIndex, currentTime);
    }
  }

  function handleBack() {
    if (currentQueryIndex !== null && currentQueryIndex > 0) {
      // TODO: End previous link
      const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
      handleEndPrevLink(currentTime);
      //TODO: Update query index
      const newCurrentQueryIndex = currentQueryIndex - 1;
      updateCurrentQueryIndex(newCurrentQueryIndex);
      //TODO: Add empty slot for clicked links
      handleAddLinkEmptySlot(newCurrentQueryIndex, currentTime);
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
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
            mb: 2,
            bgcolor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
          }}
        >
          <Button
            variant="contained"
            disabled={!checkBack}
            onClick={handleBack}
          >
            <ArrowBackIosIcon />
          </Button>
          <Button
            variant="contained"
            disabled={!checkForwad}
            onClick={handleForward}
          >
            <ArrowForwardIosIcon />
          </Button>
          <TextField
            id="Bing-Search-Text-Field"
            label="This is a search engine for you to use"
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
            onClick={async () => {
              const result = await handleSearch(inputPrompt);
              handleQueryHistory(inputPrompt, result);
              //  Remove the prompt after submit
              setInputPrompt("");
            }}
          >
            Submit
          </Button>
        </Stack>
        <Stack>
          {currentQueryIndex !== null && (
            <Typography
              variant="h6"
              sx={{ mb: 2 }}
            >{`Your Query: ${bingQueries[currentQueryIndex].query}`}</Typography>
          )}
          <Divider />
          {currentQueryIndex !== null &&
            bingQueries[currentQueryIndex].clickedLinks.length > 0 && (
              <Stack>
                <Typography variant="h5" sx={{ m: 2, textAlign: "center" }}>
                  Browsing History
                </Typography>
                <Divider color="error" sx={{ borderWidth: "6px" }} />
                {bingQueries[currentQueryIndex].clickedLinks.map((link) => (
                  <LinkSlot
                    key={link.linkId}
                    title={link.title}
                    url={link.url}
                    snippet={link.snippet}
                    handleEndPrevLink={handleEndPrevLink}
                  />
                ))}
                <Divider color="error" sx={{ borderWidth: "6px" }} />
              </Stack>
            )}
          {currentQueryIndex !== null &&
            bingQueries[currentQueryIndex].cachedLinks?.map((result) => (
              <LinkSlot
                key={result.id}
                title={result.name}
                url={result.url}
                snippet={result.snippet}
                handleEndPrevLink={handleEndPrevLink}
              />
            ))}
        </Stack>
      </Container>
    </Box>
  );
}
