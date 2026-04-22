/**
 * routes/medicationRoutes.js
 *
 * Base: /api/meds
 */

const express = require("express");
const {
  addMedication,
  getMedications,
  toggleMedication,
} = require("../controllers/medicationController");

const router = express.Router();

// POST  /api/meds                    — Add medication (auto time-slot scheduling)
router.post("/", addMedication);

// GET   /api/meds/:patientId         — Get all medications for a patient
router.get("/:patientId", getMedications);

// PATCH /api/meds/:id/toggle         — Toggle active / inactive status
router.patch("/:id/toggle", toggleMedication);

module.exports = router;
