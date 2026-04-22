/**
 * controllers/patientController.js
 *
 * Handles operations for the Patient resource.
 *   POST /api/patient       — Create a new patient profile
 *   GET  /api/patient/:id   — Fetch a patient by ID
 *   GET  /api/patient       — List all patients
 */

const Patient = require("../models/Patient");

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/patient — Create patient profile
// ─────────────────────────────────────────────────────────────────────────────
const createPatient = async (req, res) => {
  const { name, age, bloodGroup, knownConditions, emergencyContact } = req.body;

  const patient = await Patient.create({
    name,
    age,
    bloodGroup,
    knownConditions,
    emergencyContact,
  });

  res.status(201).json({
    success: true,
    message: "Patient profile created successfully",
    data: patient,
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/patient/:id — Get a single patient with their full profile
// ─────────────────────────────────────────────────────────────────────────────
const getPatient = async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    return res.status(404).json({
      success: false,
      error: "Patient not found",
    });
  }

  res.json({
    success: true,
    data: patient,
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/patient — List all patients (summary view)
// ─────────────────────────────────────────────────────────────────────────────
const getAllPatients = async (req, res) => {
  const patients = await Patient.find({}).select("name age bloodGroup knownConditions createdAt");

  res.json({
    success: true,
    count: patients.length,
    data: patients,
  });
};

module.exports = { createPatient, getPatient, getAllPatients };
