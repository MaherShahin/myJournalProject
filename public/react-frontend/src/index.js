import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Error from "./components/error/error";
import JournalEntries from "./components/journalEntries/journalEntries";
import Login from "./components/login/login";
import Register from "./components/register/register";
import "./styles.css";

const rootElement = ReactDOM.createRoot(document.getElementById("root"));
rootElement.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/journalEntries" element={<JournalEntries />} />
      <Route
        path="*"
        element={<Error errorMessages={["Resource not found"]} />}
      />
    </Routes>
  </BrowserRouter>
);
