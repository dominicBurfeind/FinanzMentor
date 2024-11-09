import React, { useState } from "react"; // React und useState importieren
import { Container, ProgressBar, Card } from "react-bootstrap"; // Bootstrap-Komponenten importieren

const BudgetSection = ({ budgets }) => {
  const [expandedIndex, setExpandedIndex] = useState(null); // Index des erweiterten Budgets speichern

  // Berechnet den Fortschritt basierend auf den Erstellungs- und Ziel-Daten
  const calculateProgress = (creationDate, targetDate) => {
    const parsedCreationDate = new Date(creationDate); // Erstellungsdatum parsen
    const parsedTargetDate = new Date(targetDate); // Ziel-Datum parsen

    // Überprüfen, ob die Daten gültig sind
    if (
      isNaN(parsedCreationDate.getTime()) ||
      isNaN(parsedTargetDate.getTime())
    ) {
      return 0; // Ungültige Daten, Fortschritt auf 0 setzen
    }

    const currentDate = new Date(); // Aktuelles Datum
    const totalDays = Math.ceil(
      (parsedTargetDate - parsedCreationDate) / (1000 * 60 * 60 * 24)
    ); // Gesamtdauer in Tagen
    const elapsedDays = Math.ceil(
      (currentDate - parsedCreationDate) / (1000 * 60 * 60 * 24)
    ); // Verstrichene Tage
    return Math.min(100, Math.round((elapsedDays / totalDays) * 100)); // Fortschritt in Prozent (max. 100%)
  };

  // Budgets mit Fortschritt und überschrittenem Status anreichern
  const enrichedBudgets = budgets.map((budget) => {
    const progress = calculateProgress(budget.creationDate, budget.targetDate);
    return { ...budget, progress, isExceeded: progress >= 100 }; // Fortschritt berechnen und Status hinzufügen
  });

  // Wechselt die Anzeige der Budgetbeschreibung
  const toggleDescription = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Beschreibung ein- oder ausblenden
  };

  return (
    <section className="budget-section">
      <h2 className="section-title">Deine Budgets</h2>
      <Container className="d-flex flex-column align-items-center">
        {enrichedBudgets.length > 0 ? (
          enrichedBudgets.map((budget, index) => (
            <Card
              key={index}
              className="budget-card shadow-lg mb-4 p-3"
              onClick={() => toggleDescription(index)} // Klick auf die Karte zum Erweitern
            >
              <Card.Body className="budget-card-body">
                <Card.Title className="budget-name">{budget.name}</Card.Title>
                {/* Fortschrittsbalken anzeigen */}
                <ProgressBar
                  now={budget.progress}
                  variant={budget.isExceeded ? "secondary" : "info"}
                  label={`${budget.progress}%`} // Fortschritt als Label
                />
                <p className="budget-info">
                  Ziel: {new Date(budget.targetDate).toLocaleDateString()}{" "}
                  {/* Ziel-Datum anzeigen */}
                </p>
                {expandedIndex === index && ( // Zeige Beschreibung nur, wenn das Budget erweitert ist
                  <div className="budget-description">
                    <p>{budget.description}</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="placeholder-text">
            Noch keine Budgets erstellt. Erstellen Sie ein neues Budget, um den
            Fortschritt zu verfolgen!
          </p>
        )}
      </Container>
    </section>
  );
};

export default BudgetSection; // BudgetSection exportieren
