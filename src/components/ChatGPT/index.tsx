import React from "react";
import {
  Container,
  Box,
  Stack,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import moment from "moment";
import Dialog from "./Dialog";
import { v4 as uuidv4 } from "uuid";
import { Configuration, OpenAIApi } from "openai";
import { IChoice, IUsage } from "../../types";
import {
  concatTokensAndTokenProbs,
  convertLogprobsToProbs,
} from "../../utils/chatGPT";
import { useSessionState } from "../../redux/sessionState";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTimeState } from "../../redux/timeState";

export default function ChatGPTPage() {
  const [inputPrompt, setInputPrompt] = React.useState<string>("");
  // const [dialogs, setDialogs] = React.useState<
  //   { question: string; answer: IChoice; usage: IUsage }[]
  // >([]);
  const theme = useTheme();
  const {
    chatQueryCounting,
    updateChatQueryCounting,
    chatQueryStartTime,
    updateChatQueryStartTime,
    chatQueryId,
    updateChatQueryId,
  } = useTimeState();
  const {
    currentQueryIndex,
    updateCurrentQueryIndex,
    chatgptQueries,
    addChatgptQuery,
    updateChatgptQueries,
  } = useSessionState();

  const checkForwad = React.useMemo(() => {
    if (currentQueryIndex === null) {
      return false;
    } else if (currentQueryIndex === chatgptQueries.length - 1) {
      return false;
    } else {
      return true;
    }
  }, [currentQueryIndex, chatgptQueries]);
  const checkBack = React.useMemo(() => {
    if (currentQueryIndex === null) {
      return false;
    } else if (currentQueryIndex === 0) {
      return false;
    } else {
      return true;
    }
  }, [currentQueryIndex]);

  const query_answer = async (prompt: string) => {
    const configuration = new Configuration({
      apiKey: import.meta.env.VITE_CHATGPT_KEY,
    });
    const openai = new OpenAIApi(configuration);
    try {
      const completion = await openai.createCompletion(
        {
          model: "text-davinci-003",
          prompt: prompt,
          // stop: "<|endoftext|>",
          // top_p: 1,
          // n: 2, // Number of answers to return
          temperature: 0,
          frequency_penalty: 0,
          presence_penalty: 0,
          max_tokens: 4000,
          logprobs: 1, // Return the log probabilities along with the samples. 3 means return the top 3 log probabilities.
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const usage = completion.data.usage as IUsage;
      const answerChoice = completion.data.choices[0] as IChoice;

      return { answer: answerChoice, usage: usage };
    } catch (e: any) {
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data);
      } else {
        console.log(e.message);
      }
    }
  };

  function handleEndPredvQuery(currentTime: string) {
    if (
      currentQueryIndex !== null &&
      chatQueryCounting === true &&
      chatQueryStartTime !== "" &&
      chatQueryId !== ""
    ) {
      const endTime = moment(currentTime);
      const duration = endTime.diff(chatQueryStartTime);
      const targetQuery = chatgptQueries[currentQueryIndex];
      if (targetQuery) {
        const newDurationArr = targetQuery.duration;
        newDurationArr[newDurationArr.length - 1] = duration;
        updateChatgptQueries(targetQuery.queryId, {
          duration: newDurationArr,
        });
        updateChatQueryCounting(false);
        updateChatQueryStartTime("");
        updateChatQueryId("");
      }
    }
  }

  async function handleQueryHistory(
    inputPrompt: string,
    answer: IChoice,
    usage: IUsage
  ) {
    // Get current timestamp
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const newQueryId = uuidv4();
    //TODO handle first query
    if (currentQueryIndex === null) {
      //TODO: Add new query
      addChatgptQuery({
        queryId: newQueryId,
        query: inputPrompt,
        answer: answer,
        usage: usage,
        duration: [0],
        queryTime: [currentTime],
      });
      updateCurrentQueryIndex(0);
    } else {
      //TODO: End previous query
      handleEndPredvQuery(currentTime);
      //TODO: Add new query
      addChatgptQuery({
        queryId: newQueryId,
        query: inputPrompt,
        answer: answer,
        usage: usage,
        duration: [0],
        queryTime: [currentTime],
      });
      updateCurrentQueryIndex(chatgptQueries.length - 1);
    }
    updateChatQueryCounting(true);
    updateChatQueryStartTime(currentTime);
    updateChatQueryId(newQueryId);
  }

  function handleAddQueryStartTimeSlot(
    currentQueryIdx: number,
    currentTime: string
  ) {
    const targetQuery = chatgptQueries[currentQueryIdx];
    const newQueryTimeArr = targetQuery.queryTime;
    newQueryTimeArr.push(currentTime);
    const newDurationArr = targetQuery.duration;
    newDurationArr.push(0);
    updateChatgptQueries(targetQuery.queryId, {
      queryTime: newQueryTimeArr,
      duration: newDurationArr,
    });
  }

  function handleStartCounting(currentTime: string, currentQueryId: string) {
    updateChatQueryCounting(true);
    updateChatQueryStartTime(currentTime);
    updateChatQueryId(currentQueryId);
  }

  function handleForward() {
    if (
      currentQueryIndex !== null &&
      currentQueryIndex < chatgptQueries.length
    ) {
      //TODO: End previous query
      const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
      handleEndPredvQuery(currentTime);
      //TODO: Update query index
      const newCurrentQueryIndex = currentQueryIndex + 1;
      updateCurrentQueryIndex(newCurrentQueryIndex);
      //TODO: Add new query start time slot and duration slot
      handleAddQueryStartTimeSlot(newCurrentQueryIndex, currentTime);
      //TODO: Start counting
      handleStartCounting(
        currentTime,
        chatgptQueries[newCurrentQueryIndex].queryId
      );
    }
  }
  function handleBack() {
    if (currentQueryIndex !== null && currentQueryIndex > 0) {
      //TODO: End previous query
      const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
      handleEndPredvQuery(currentTime);
      //TODO: Update query index
      const newCurrentQueryIndex = currentQueryIndex - 1;
      updateCurrentQueryIndex(newCurrentQueryIndex);
      //TODO: Add new query start time slot and duration slot
      handleAddQueryStartTimeSlot(newCurrentQueryIndex, currentTime);
      //TODO: Start counting
      handleStartCounting(
        currentTime,
        chatgptQueries[newCurrentQueryIndex].queryId
      );
    }
  }
  return (
    <Box
      sx={{
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
            id="ChatGPT-Text-Field"
            label="ChatGPT"
            multiline
            rows={2}
            value={inputPrompt}
            onChange={(e) => {
              setInputPrompt(e.currentTarget.value);
            }}
            sx={{ width: "100%" }}
          />
          <Button
            variant="contained"
            onClick={async () => {
              const inputTemp = inputPrompt;
              setInputPrompt("");
              const result = await query_answer(inputTemp);
              if (result?.answer && result?.usage) {
                handleQueryHistory(inputTemp, result.answer, result.usage);
              }
              //  Remove the prompt after submit
            }}
          >
            Submit
          </Button>
        </Stack>
        <Stack>
          {/* <Box sx={{ height: "6rem" }} /> */}
          {/* {dialogs.length > 0 &&
            dialogs.map((dialog, index) => (
              <Box key={index}>
                <Dialog
                  question={dialog.question}
                  answer={dialog.answer.text}
                  answerProbs={concatTokensAndTokenProbs(
                    dialog.answer.logprobs.tokens,
                    convertLogprobsToProbs(
                      dialog.answer.logprobs.token_logprobs
                    ),
                    dialog.usage.completion_tokens
                  )}
                  top_logprobs={dialog.answer.logprobs.top_logprobs}
                />
              </Box>
            ))} */}
          {currentQueryIndex !== null && chatgptQueries[currentQueryIndex] && (
            <Dialog
              question={chatgptQueries[currentQueryIndex].query}
              answer={chatgptQueries[currentQueryIndex].answer.text}
              answerProbs={concatTokensAndTokenProbs(
                chatgptQueries[currentQueryIndex].answer.logprobs.tokens,
                convertLogprobsToProbs(
                  chatgptQueries[currentQueryIndex].answer.logprobs
                    .token_logprobs
                ),
                chatgptQueries[currentQueryIndex].usage.completion_tokens
              )}
              top_logprobs={
                chatgptQueries[currentQueryIndex].answer.logprobs.top_logprobs
              }
            />
          )}
        </Stack>
      </Container>
    </Box>
  );
}