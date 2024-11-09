import React from "react";

const TransactionContainer = ({ transactions = [] }) => {
  // Function to check if a date is valid
  const isValidDate = (date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime()); // Returns true if it's a valid date
  };

  return (
    <div className="transaction-container">
      <h2>Deine Transaktionen</h2>
      {transactions.length > 0 ? (
        <ul className="transaction-list">
          {transactions.map((transaction, index) => {
            // Überprüfen, ob transaction.date gültig ist
            let transactionDate = "Unbekannt"; // Default fallback if the date is invalid
            if (transaction.date && isValidDate(transaction.date)) {
              transactionDate = new Date(transaction.date).toLocaleString(
                "de-DE",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );
            }

            // Ensure the amount is valid before calling toLocaleString()
            const transactionAmount =
              transaction.amount && !isNaN(transaction.amount)
                ? transaction.amount
                : 0; // Default to 0 if amount is invalid

            return (
              <li
                key={index}
                className={transaction.type === "income" ? "income" : "expense"}
              >
                <span>{transaction.description}</span>
                <span>
                  {transactionAmount.toLocaleString("de-DE", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  €
                </span>
                <span className="transaction-date">
                  {/* Datum und Uhrzeit formatiert anzeigen */}
                  {transactionDate}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="no-transactions">
          Es wurden keine Transaktionen durchgeführt.
        </p>
      )}
    </div>
  );
};

export default TransactionContainer;
