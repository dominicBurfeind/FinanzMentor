import React from "react"; // React-Bibliothek importieren
import { Container, Card } from "react-bootstrap"; // Bootstrap-Komponenten für Layout und Design

// BudgetContainer-Komponente, die Kontodaten als Props erhält
function BudgetContainer({ balance = 0, accountHolder, accountNumber }) {
  return (
    <Container
      id="budgetContainerContainer" // Container-ID für spezifische Styles
      className="d-flex justify-content-center" // Flexbox für Zentrierung
    >
      <Card
        id="budgetCard" // ID der Karte
        className="text-center bank-balance-card shadow-lg p-3 mb-5 rounded" // Stil der Karte
      >
        <Card.Header as="h5" id="card-header" className="text-white">
          Kontostand
        </Card.Header>
        <Card.Body>
          <Card.Title>{accountHolder}</Card.Title>{" "}
          {/* Name des Kontoinhabers */}
          <Card.Text className="account-number">
            Konto Nr: {accountNumber} {/* Kontonummer anzeigen */}
          </Card.Text>
          <Card.Text className="balance-amount">
            {balance.toLocaleString("en-US", { minimumFractionDigits: 2 })} €{" "}
            {/* Kontostand formatiert */}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BudgetContainer; // Komponente exportieren
