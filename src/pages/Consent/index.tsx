import React from "react";
import {
  Container,
  Stack,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  SxProps,
  Theme,
  Box,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";

export default function ConsentPage({
  setCheckConsent,
}: {
  setCheckConsent: (value: boolean) => void;
}) {
  const [checked, setChecked] = React.useState(true);
  // const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ px: 4, py: 2, textAlign: "center" }}>
        Microsoft Research Project Participation Consent Form
      </Typography>
      <Subtitle text="INTRODUCTION" />
      <RegularText
        text="Thank you for taking the time to consider volunteering in a Microsoft
        Corporation research project. This form explains what would happen if
        you join this research project. Please read it carefully and take as
        much time as you need. Email the study team to ask about anything that
        is not clear."
      />
      <RegularText
        text="Participation in this study is voluntary and you may withdraw at any
        time."
      />
      <Subtitle text="TITLE OF RESEARCH PROJECT Principal Investigator: Dan Goldstein PURPOSE" />
      <RegularText text="Consumer choice" sx={{ mb: 1 }} />
      <RegularText text="The purpose of this project is to study how consumers would search for information to make purchase decisions." />
      <Subtitle text="PROCEDURES" />
      <RegularText text="During this project, you will be given access to some search tools and be given a search task. After each search task you will be asked to my a hypothetical decision. Microsoft will record the searches you perform and information you enter in the forms of this experiment. Approximately 1000 participants will be involved in this study." />
      <Subtitle text="PERSONAL INFORMATION" />
      <RegularText>
        <Typography component="li" variant="body1">
          <b>Personal information we collect.</b> Aside from your platform
          specific ID (e.g., Mechanical Turk ID etc.), no personal information
          will be collected during this study. Your platform specific ID can
          only be linked to your name by the platform, not by researchers, and
          the platform will not have access to your responses to this task. Your
          ID number will not be shared outside of Microsoft Research and the
          confines of this study without your permission, and will be promptly
          deleted after compensation has been successfully provided (30 days or
          less). De-identified data may be used for future research or given to
          another investigator for future use without additional consent.
        </Typography>
        <Typography component="li" variant="body1">
          Microsoft Research is ultimately responsible for determining the
          purposes and uses of data collected through this study.
        </Typography>
        <Typography component="span">
          For additional information or concerns about how Microsoft handles
          your personal information, please see the{" "}
          <a
            href="https://privacy.microsoft.com/en-us/privacystatement"
            rel="noreferrer"
            target="_blank"
          >
            Microsoft Privacy Statement{" "}
          </a>
          (
          <a
            href="https://privacy.microsoft.com/en-us/privacystatement"
            rel="noreferrer"
            target="_blank"
          >
            https://privacy.microsoft.com/en-us/privacystatement
          </a>
          ).
        </Typography>
      </RegularText>
      <Subtitle text="BENEFITS AND RISKS" />
      <RegularText>
        <Typography sx={{ p: 0 }} component="span">
          <b>Benefits: </b> There are no direct benefits to you that might
          reasonably be expected as a result of being in this study. The
          research team expects to learn about numerical cognition from the
          results of this research, as well as any public benefit that may come
          from these research results being shared with the greater scientific
          community.
        </Typography>
      </RegularText>
      <RegularText>
        <Typography sx={{ p: 0 }} component="span">
          <b>Risk: </b> If you are unable to submit a HIT due to technical
          difficulties on your end there is a risk of loss of payment. To
          mitigate participants can reach out to the research team for input on
          resolving any difficulties encountered.
        </Typography>
      </RegularText>
      <Subtitle text="PAYMENT FOR PARTICIPATION" />
      <RegularText text="You will receive compensation after completing the entire study based on the amount and type of questions you complete.  The amount you can expect to earn has been clearly communicated to you before the start of the study.  " />
      <RegularText text="Your data and/or samples may be used to make new products, tests or findings.  These may have value and may be developed and owned by Microsoft and/or others.  If this happens, there are no plans to pay you." />
      <Subtitle text="CONTACT INFORMATION" />
      <RegularText text="Should you have any questions concerning this project, or if you are injured as a result of being in this study, please contact us at dgg@microsoft.com." />
      <RegularText text="Should you have any questions about your rights as a research subject, please contact Microsoft Research Ethics Program Feedback at MSRStudyfeedback@microsoft.com." />
      <Subtitle text="CONSENT" />
      <RegularText text="By clicking “I agree” below, you confirm that the study was explained to you, you had a chance to ask questions before beginning the study, and all your questions were answered satisfactorily. By clicking “I agree” below, you voluntarily consent to participate, and you do not give up any legal rights you have as a study participant." />
      <RegularText text="You will be provided a link to download this form. On behalf of Microsoft, we thank you for your contribution and look forward to your research session." />
      <RegularText>
        <b>Do you understand and consent to these terms?</b>
      </RegularText>

      <Stack
        sx={{ px: 4 }}
        direction="column"
        justifyContent="left"
        alignItems="left"
      >
        <FormControlLabel
          control={<Checkbox checked={checked} />}
          label={<b>I agree</b>}
          onClick={() => setChecked(!checked)}
        />
        <FormControlLabel
          control={<Checkbox checked={!checked} />}
          label={<b>No thanks, I do not wish to perform this task</b>}
          sx={{ pb: 2 }}
          onClick={() => setChecked(false)}
        />
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 8 }}>
        <Button
          variant="contained"
          disabled={!checked}
          onClick={() => setCheckConsent(true)}
        >
          Cotinue
        </Button>
      </Box>
    </Container>
  );
}

export function Subtitle({ text, sx }: { text: string; sx?: SxProps<Theme> }) {
  return (
    <Typography
      variant="h5"
      sx={{ px: 4, mb: 1, mt: 3, fontWeight: "bolder", ...sx }}
    >
      {text}
    </Typography>
  );
}

export function RegularText({
  text,
  sx,
  children: Child,
}: {
  text?: string;
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
}) {
  return (
    <Typography variant="body1" sx={{ px: 4, ...sx }}>
      {Child ? Child : text}
    </Typography>
  );
}