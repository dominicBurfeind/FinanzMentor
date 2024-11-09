import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import BudgetContainer from "../components/budgetContainer";
import MenuBottom from "../components/menuBottom";
import FinanceGraph from "../components/financeGraph";
import TransactionContainer from "../components/transaktionen";
import BudgetSection from "../components/budgetListe";

const Home = () => {
  // State management for balance
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem("balance");
    return savedBalance && !isNaN(savedBalance) ? parseFloat(savedBalance) : 0;
  });

  // State management for transactions
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions
      ? JSON.parse(savedTransactions).map((transaction) => ({
          ...transaction,
          date: new Date(transaction.date), // Convert `date` to Date object
        }))
      : [];
  });

  const [budgets, setBudgets] = useState(() => {
    const savedBudgets = localStorage.getItem("budgets");

    // Check if we have budgets in localStorage and if so, validate them
    return savedBudgets
      ? JSON.parse(savedBudgets).map((budget) => {
          const targetAmount = parseFloat(budget.targetAmount);
          const targetDate = new Date(budget.targetDate);

          // Ensure the targetAmount is valid
          const validTargetAmount = !isNaN(targetAmount) ? targetAmount : 0;

          // Ensure the targetDate is valid
          const validTargetDate = !isNaN(targetDate.getTime())
            ? targetDate
            : new Date();

          // Calculate the progress only if targetAmount and targetDate are valid
          const progress =
            validTargetDate > new Date() && validTargetAmount > 0
              ? Math.min(
                  100,
                  Math.round(
                    ((new Date() - new Date(budget.creationDate)) /
                      (validTargetDate - new Date(budget.creationDate))) *
                      100
                  )
                )
              : 0;

          return {
            ...budget,
            targetAmount: validTargetAmount,
            targetDate: validTargetDate,
            progress: !isNaN(progress) ? progress : 0, // Fallback to 0 if progress is NaN
          };
        })
      : [];
  });

  // State management for modal
  const [showModal, setShowModal] = useState(false);
  const [newBudget, setNewBudget] = useState({
    name: "",
    targetAmount: 0,
    targetDate: "",
    description: "",
    reason: "",
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  // Modal handlers
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Handle adding income to balance
  const handleAddAmount = (amount, description) => {
    if (amount <= 0) return;
    const newBalance = balance + amount;
    setBalance(newBalance);
    addTransaction(amount, description, "income", newBalance);
  };

  // Handle subtracting expense from balance (even if balance is 0 or negative)
  const handleSubtractAmount = (amount, description) => {
    if (amount <= 0) return; // Prevent subtracting zero or negative amounts
    const newBalance = balance - amount;
    setBalance(newBalance);
    addTransaction(-amount, description, "expense", newBalance);
  };

  // Add a new transaction to the list
  const addTransaction = (amount, description, type, balanceAtTransaction) => {
    const newTransaction = {
      amount,
      description,
      type,
      date: new Date(), // Make sure this is a Date object
      balanceAtTransaction,
    };
    setTransactions((prevTransactions) => [
      newTransaction,
      ...prevTransactions,
    ]);
  };

  // Handle budget input changes
  const handleBudgetInputChange = (e) => {
    const { name, value } = e.target;
    setNewBudget((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new budget entry
  const addBudget = () => {
    const creationDate = new Date();
    const targetDate = new Date(newBudget.targetDate);

    // Ensure targetAmount is a valid number
    const targetAmount = parseFloat(newBudget.targetAmount);
    if (isNaN(targetAmount)) return; // If it's not a valid number, exit

    // Ensure targetDate is a valid date
    if (isNaN(targetDate.getTime())) return; // If it's not a valid date, exit

    const progress =
      targetDate > creationDate
        ? Math.min(
            100,
            Math.round(
              ((new Date() - creationDate) / (targetDate - creationDate)) * 100
            )
          )
        : 100;

    const newBudgetEntry = {
      ...newBudget,
      creationDate,
      targetDate,
      targetAmount,
      progress,
      isExceeded: progress >= 100,
    };

    setBudgets((prevBudgets) => [...prevBudgets, newBudgetEntry]);

    // Save the updated budgets in localStorage
    localStorage.setItem(
      "budgets",
      JSON.stringify([...budgets, newBudgetEntry])
    );

    setNewBudget({
      name: "",
      targetAmount: 0,
      targetDate: "",
      description: "",
      reason: "",
    });
    closeModal();
  };

  return (
    <>
      <header className="home-header">
        <div className="top-header container-fluid">
          <h1 className="col-7">Hello user</h1>
          <div className="header-btn">
            <a id="budgetErstellen" className="header-btn" onClick={openModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
                width={30}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Budget erstellen
            </a>
          </div>
        </div>
      </header>

      <BudgetContainer
        balance={balance}
        accountHolder="User0"
        accountNumber="123456789"
      />

      <FinanceGraph transactions={transactions} />

      <TransactionContainer transactions={transactions} />

      <BudgetSection budgets={budgets} />

      <MenuBottom
        onAddAmount={handleAddAmount}
        onSubtractAmount={handleSubtractAmount}
      />

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Neues Budget erstellen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBudgetName">
              <Form.Label>Budgetname</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={newBudget.name}
                onChange={handleBudgetInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formTargetAmount">
              <Form.Label>Zielbetrag</Form.Label>
              <Form.Control
                required
                type="number"
                name="targetAmount"
                value={newBudget.targetAmount}
                onChange={handleBudgetInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formTargetDate">
              <Form.Label>Zieldatum</Form.Label>
              <Form.Control
                required
                type="date"
                name="targetDate"
                value={newBudget.targetDate}
                onChange={handleBudgetInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Beschreibung</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newBudget.description}
                onChange={handleBudgetInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Abbrechen
          </Button>
          <Button variant="primary" onClick={addBudget}>
            Budget erstellen
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;
