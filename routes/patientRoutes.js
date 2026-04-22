/**
 * routes/patientRoutes.js
 *
 * Base: /api/patient
 */

const express = require("express");
const {
  createPatient,
  getPatient,
  getAllPatients,
} = require("../controllers/patientController");

const router = express.Router();

// POST /api/patient          — Setup a new patient profile
router.post("/", createPatient);

// GET  /api/patient          — List all patients
router.get("/", getAllPatients);

// GET  /api/patient/:id      — Get a specific patient by ID
router.get("/:id", getPatient);

module.exports = router;
