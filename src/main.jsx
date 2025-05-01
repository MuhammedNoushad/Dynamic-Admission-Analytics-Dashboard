import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AdmissionDashboard from "./AdmissionDashboard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdmissionDashboard />
  </StrictMode>
);
