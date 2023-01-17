import React from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { Card, CardHeader, CardContent, Button } from "@mui/material";
import { useSessionState } from "../../redux/sessionState";
import { useTimeState } from "../../redux/timeState";
import { IClickedLink } from "../../types";

export interface ILinkSlot {
  title: string;
  snippet: string;
  url: string;
  handleEndPrevLink: (currentTime: string) => void;
}

export default function LinkSlot({
  title,
  snippet,
  url,
  handleEndPrevLink,
}: ILinkSlot) {
  const {
    currentQueryIndex,
    bingQueries,
    addClickedLink,
    updateBingQueryLink,
  } = useSessionState();
  const { updateLinkStartTime, updateCurrentLinkId, updateLinkCounting } =
    useTimeState();

  const handleAddNewLink = (currentTime: string) => {
    if (currentQueryIndex !== null) {
      // TODO: add new link to current query
      const currentQuery = bingQueries[currentQueryIndex];
      const linkId = uuidv4();
      const newClickedTimeArr = [...currentQuery.queryTime.map(() => "")];
      newClickedTimeArr[currentQuery.queryTime.length - 1] = currentTime;
      const newLink: IClickedLink = {
        linkId,
        title: title,
        snippet: snippet,
        url: url,
        clickedTime: newClickedTimeArr,
        duration: [...currentQuery.queryTime.map(() => 0)],
      };
      addClickedLink(currentQuery.queryId, newLink);
      updateCurrentLinkId(linkId);
      updateLinkStartTime(currentTime);
      updateLinkCounting(true);
    }
  };

  const handleUpdateExistingLink = (
    link: IClickedLink,
    currentTime: string
  ) => {
    if (currentQueryIndex !== null) {
      const currentQuery = bingQueries[currentQueryIndex];
      const newClickedTimeArr = [...link.clickedTime];
      newClickedTimeArr[currentQuery.queryTime.length - 1] = currentTime;
      const newLink: IClickedLink = {
        ...link,
        clickedTime: newClickedTimeArr,
      };
      updateBingQueryLink(currentQuery.queryId, link.linkId, newLink);
      updateCurrentLinkId(link.linkId);
      updateLinkStartTime(currentTime);
      updateLinkCounting(true);
    }
  };

  return (
    <Card sx={{ m: 2 }}>
      <CardHeader
        title={title}
        action={
          <Button
            variant="outlined"
            aria-label="bing_link"
            component="a"
            href={url}
            target="_blank"
            onClick={() => {
              const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
              handleEndPrevLink(currentTime);
              //TODO: Check if the link is already clicked
              if (currentQueryIndex !== null) {
                const existLink = bingQueries[
                  currentQueryIndex
                ].clickedLinks.find((link) => link.url === url);
                if (existLink) {
                  handleUpdateExistingLink(existLink, currentTime);
                } else {
                  handleAddNewLink(currentTime);
                }
              }
            }}
          >
            Visit
          </Button>
        }
      />
      <CardContent>{snippet}</CardContent>
    </Card>
  );
}
