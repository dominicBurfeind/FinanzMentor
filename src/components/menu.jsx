import React, { useState, useEffect } from "react"; // React und Hooks importieren
import {
  Navbar,
  Container,
  Offcanvas,
  Spinner,
  Form,
  Button,
} from "react-bootstrap"; // Bootstrap-Komponenten importieren
import { Line } from "react-chartjs-2"; // Line-Chart von Chart.js importieren
import { fetchStockData } from "../data/alphaVantageService"; // Datenabruf für Aktien importieren
import "../styles/DarkMode.css"; // Dark-Mode Styles importieren

function Menu() {
  const [show, setShow] = useState(false); // Zustand für das Anzeigen des Menüs
  const [darkMode, setDarkMode] = useState(false); // Zustand für Dark-Mode
  const [chartData, setChartData] = useState(null); // Zustand für die Chart-Daten
  const [loading, setLoading] = useState(false); // Zustand für Ladeanzeige
  const [error, setError] = useState(null); // Zustand für Fehler
  const [symbol, setSymbol] = useState("AAPL"); // Zustand für das Aktiensymbol

  const handleShow = () => setShow(true); // Menü anzeigen
  const handleClose = () => setShow(false); // Menü schließen

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode); // Dark-Mode umschalten

  // Funktion zum Abrufen und Vorbereiten der Aktien-Daten
  const handleSearch = () => {
    setLoading(true); // Ladeanzeige aktivieren
    fetchStockData(symbol)
      .then((data) => {
        if (data) {
          setChartData(prepareChartData(data)); // Chart-Daten vorbereiten
          setError(null); // Fehler zurücksetzen
        } else {
          setError("No data available for this symbol."); // Fehler, falls keine Daten vorhanden sind
          setChartData(null);
        }
        setLoading(false); // Ladeanzeige deaktivieren
      })
      .catch((err) => {
        setError(`Error fetching stock data: ${err.message}`); // Fehlerbehandlung
        setLoading(false);
        setChartData(null);
      });
  };

  // Bereitet die Chart-Daten für die Anzeige vor
  const prepareChartData = (data) => {
    const times = Object.keys(data).slice(0, 20).reverse(); // Die letzten 20 Tage nehmen
    const prices = times.map((time) => parseFloat(data[time]["4. close"])); // Schließkurse extrahieren

    return {
      labels: times,
      datasets: [
        {
          label: `Closing Price for ${symbol}`,
          data: prices,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  };

  // Effekt, um die Daten beim Anzeigen des Menüs zu laden
  useEffect(() => {
    if (show) handleSearch();
  }, [show]);

  // Dark-Mode Effekt aktivieren
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <>
      <Navbar expand="false" className="container-fluid" id="Navbar">
        <Container className="navbar-container">
          <Navbar.Toggle
            aria-controls="navbar-toggle"
            onClick={handleShow}
            className="toggle border-0"
            id="menuToggle"
          />
          <Navbar.Brand href="#home" className="mx-auto">
            <img src="/img/logo-2-tp.png" width={120} alt="Logo" />
          </Navbar.Brand>
          <div className="right-icon">
            {/* Icon für Einstellungen */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              style={{ cursor: "pointer" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            {/* Icon zum Umschalten des Dark-Mode */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              onClick={toggleDarkMode}
              style={{ cursor: "pointer" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </div>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Stock Data</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Formular zur Eingabe des Aktien-Symbols */}
          <Form
            className="mb-3"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(); // Abrufen der Daten bei Formularübermittlung
            }}
          >
            <Form.Group controlId="stockSymbol">
              <Form.Label>Enter Stock Symbol</Form.Label>
              <Form.Control
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())} // Eingabewert setzen
                placeholder="e.g., AAPL, MSFT"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>

          {/* Ladeanzeige und Fehlerbehandlung */}
          {loading && <Spinner animation="border" variant="primary" />}
          {error && <div className="text-danger">{error}</div>}

          {/* Wenn Daten verfügbar sind, wird das Diagramm angezeigt */}
          {chartData && !loading && !error && (
            <div>
              <h4>Stock Data for {symbol} (Last 4 Weeks)</h4>
              <Line data={chartData} />
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Menu; // Menü-Komponente exportieren
