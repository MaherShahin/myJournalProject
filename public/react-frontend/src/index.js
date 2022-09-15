import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import EntryForm from "./components/entryForm/entryForm";
import JournalEntries from "./components/journalEntries/journalEntries";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const rootElement = ReactDOM.createRoot(document.getElementById("root"));
rootElement.render(  
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/journalEntries" element={<JournalEntries />} />
    <Route path="/newEntry" element={<EntryForm />} />
  </Routes>
</BrowserRouter>
);


