import React, { useState, useEffect } from "react"; // React und die Hooks importieren
import axios from "axios"; // axios für API-Anfragen importieren

const StockData = () => {
  const [stockData, setStockData] = useState(null); // Speichert die abgerufenen Aktien-Daten
  const [error, setError] = useState(null); // Speichert eventuelle Fehler
  const [loading, setLoading] = useState(true); // Kontrolliert den Ladezustand

  useEffect(() => {
    // API-Endpunkt und API-Schlüssel
    const API_KEY = "EDOF464XW2K8AA0E"; // Ersetze durch deinen echten API-Schlüssel
    const symbol = "IBM"; // Hier das Aktiensymbol ändern (z.B. 'AAPL' für Apple)
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;

    // Abrufen der Aktien-Daten beim ersten Rendern der Komponente
    axios
      .get(url)
      .then((response) => {
        setStockData(response.data); // Setzt die abgerufenen Daten in den State
        setLoading(false); // Ladeanzeige ausschalten, sobald die Daten da sind
      })
      .catch((err) => {
        setError(err.message); // Fehler abfangen und im State speichern
        setLoading(false); // Ladeanzeige ausschalten, wenn ein Fehler auftritt
      });
  }, []); // Leeres Abhängigkeits-Array sorgt dafür, dass die Funktion nur einmal beim Initialisieren aufgerufen wird

  // Ladeanzeige, wenn die Daten noch nicht abgerufen wurden
  if (loading) {
    return <div>Loading stock data...</div>;
  }

  // Fehleranzeige, falls beim Abrufen der Daten ein Fehler auftritt
  if (error) {
    return <div>Error fetching stock data: {error}</div>;
  }

  // Extrahieren der Zeitreihendaten aus der API-Antwort
  const timeSeries = stockData["Time Series (5min)"]; // Dies ist der Schlüssel für Intraday-Daten in der Antwort

  // Falls keine Zeitreihendaten vorhanden sind, eine Nachricht anzeigen
  if (!timeSeries) {
    return <div>No data available for this symbol.</div>;
  }

  // Rendering der Aktien-Daten in einer Tabelle
  return (
    <div>
      <h1>Stock Data for IBM (5-min intervals)</h1>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {/* Iteriere durch die Zeitstempel und rendere die jeweiligen Daten */}
          {Object.entries(timeSeries).map(([time, data]) => (
            <tr key={time}>
              <td>{time}</td>
              <td>{data["1. open"]}</td>
              <td>{data["2. high"]}</td>
              <td>{data["3. low"]}</td>
              <td>{data["4. close"]}</td>
              <td>{data["5. volume"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockData; // StockData-Komponente exportieren
