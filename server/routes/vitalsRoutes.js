/**
 * routes/vitalsRoutes.js
 *
 * Base: /api/vitals
 */

const express = require("express");
const { logVitals, getVitalsHistory } = require("../controllers/vitalsController");

const router = express.Router();

// POST /api/vitals                    — Log a new vitals reading (status auto-computed)
router.post("/", logVitals);

// GET  /api/vitals/:patientId         — Fetch all vitals history for a patient
// Supports ?limit=N to restrict response size (e.g. sparklines use ?limit=7)
router.get("/:patientId", getVitalsHistory);

module.exports = router;
