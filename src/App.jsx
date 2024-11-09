import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Alert from "react-bootstrap/Alert";
import Menu from "./components/menu";
import Home from "./pages/home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <>
      <Router>
        <Menu />
        <Alert id="Alert" variant="light">
          <span>Top ausgaben diesen Monat:</span>
        </Alert>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
