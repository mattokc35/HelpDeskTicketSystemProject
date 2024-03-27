const express = require("express");
const router = express.Router();
const ticketModel = require("../models/ticketModel");

// submit a new ticket
router.post("/", async (req, res) => {
  const { name, email, description } = req.body;
  try {
    const result = await ticketModel.submitTicket(name, email, description);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await ticketModel.getTickets();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// update ticket status
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await ticketModel.updateTicketStatus(id, status);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
