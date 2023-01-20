import React from "react";
import ConsentPage from "../Consent";
import IntroductionPage from "../Introduction";
import MainPage from "../Main";

export default function Environment() {
  const [checkConsent, setCheckConsent] = React.useState(false);
  const [checkIntroduction, setCheckIntroduction] = React.useState(false);
  const [checkMain] = React.useState(false);

  return (
    <div>
      {!checkConsent && <ConsentPage setCheckConsent={setCheckConsent} />}
      {!checkIntroduction && checkConsent && (
        <IntroductionPage setCheckIntroduction={setCheckIntroduction} />
      )}
      {!checkMain && checkIntroduction && <MainPage />}
    </div>
  );
}
