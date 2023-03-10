import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConsentPage from "./pages/Consent";
import MainPage from "./pages/Main";
import SurveyPage from "./pages/Survey";
import FeedbackPage from "./pages/Feedback";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ConsentPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
