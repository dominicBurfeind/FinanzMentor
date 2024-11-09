import React, { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const MenuBottom = ({ onAddAmount, onSubtractAmount }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSubtractModal, setShowSubtractModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // Handlers for modals
  const handleOpenAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleOpenSubtractModal = () => setShowSubtractModal(true);
  const handleCloseSubtractModal = () => setShowSubtractModal(false);

  // Form submission handlers
  const handleAddSubmit = () => {
    const transactionDate = new Date().toLocaleString();
    onAddAmount(parseFloat(amount), description, transactionDate);
    setAmount("");
    setDescription("");
    handleCloseAddModal();
  };

  const handleSubtractSubmit = () => {
    const transactionDate = new Date().toLocaleString();
    onSubtractAmount(parseFloat(amount), description, transactionDate);
    setAmount("");
    setDescription("");
    handleCloseSubtractModal();
  };

  // Tooltip configurations
  const einnahmenTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Einnahmen eintragen
    </Tooltip>
  );

  const ausgabenTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Ausgaben eintragen
    </Tooltip>
  );

  return (
    <>
      <section className="menuBottom container-fluid">
        <div className="menu-container d-flex justify-content-center">
          <div className="svg-container" onClick={handleOpenAddModal}>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={einnahmenTooltip}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </OverlayTrigger>
          </div>
          <div className="svg-container" onClick={handleOpenSubtractModal}>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={ausgabenTooltip}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </OverlayTrigger>
          </div>
          <div className="svg-container"></div>
        </div>
      </section>

      {/* Modal für Einnahmen hinzufügen */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Einnahme hinzufügen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAmount">
              <Form.Label>Betrag</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Betrag eingeben"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Beschreibung</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Beschreibung eingeben"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Abbrechen
          </Button>
          <Button
            variant="primary"
            onClick={handleAddSubmit}
            style={{ backgroundColor: "#007bff", borderColor: "#007bff" }}
          >
            Hinzufügen
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal für Ausgaben abziehen */}
      <Modal
        show={showSubtractModal}
        onHide={handleCloseSubtractModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Ausgabe abziehen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAmount">
              <Form.Label>Betrag</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Betrag eingeben"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Beschreibung</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Beschreibung eingeben"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSubtractModal}>
            Abbrechen
          </Button>
          <Button
            variant="danger"
            onClick={handleSubtractSubmit}
            style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
          >
            Abziehen
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MenuBottom;
