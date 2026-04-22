/**
 * controllers/medicationController.js
 *
 * Handles operations for the Medication resource.
 *   POST /api/meds              — Add medication (auto-schedules time slots)
 *   GET  /api/meds/:patientId   — Fetch all medications for a patient
 *   PATCH /api/meds/:id/toggle  — Toggle active/inactive status
 */

const Medication = require("../models/Medication");
const Patient = require("../models/Patient");

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/meds — Add a medication (timeSlots auto-scheduled via pre-save hook)
// ─────────────────────────────────────────────────────────────────────────────
const addMedication = async (req, res) => {
  const {
    patientId,
    name,
    dosage,
    frequency,
    timeSlots, // Optional: if provided, overrides auto-schedule
    startDate,
    endDate,
    instructions,
  } = req.body;

  // ── Verify patient exists ─────────────────────────────────────────────────
  const patientExists = await Patient.findById(patientId);
  if (!patientExists) {
    return res.status(404).json({
      success: false,
      error: "Patient not found. Provide a valid patientId.",
    });
  }

  const medication = await Medication.create({
    patientId,
    name,
    dosage,
    frequency,
    timeSlots: timeSlots || [], // Empty array triggers auto-schedule in pre-save hook
    startDate,
    endDate,
    instructions,
  });

  res.status(201).json({
    success: true,
    message: `Medication "${medication.name}" added. Scheduled: ${medication.timeSlots.join(", ")}`,
    data: medication,
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/meds/:patientId — List a patient's medications
// ─────────────────────────────────────────────────────────────────────────────
const getMedications = async (req, res) => {
  const { patientId } = req.params;

  const patientExists = await Patient.findById(patientId);
  if (!patientExists) {
    return res.status(404).json({
      success: false,
      error: "Patient not found",
    });
  }

  const meds = await Medication.find({ patientId }).sort({ createdAt: -1 }).select("-__v");

  res.json({
    success: true,
    count: meds.length,
    patient: {
      id: patientExists._id,
      name: patientExists.name,
    },
    data: meds,
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /api/meds/:id/toggle — Toggle medication active status
// ─────────────────────────────────────────────────────────────────────────────
const toggleMedication = async (req, res) => {
  const med = await Medication.findById(req.params.id);

  if (!med) {
    return res.status(404).json({
      success: false,
      error: "Medication not found",
    });
  }

  med.isActive = !med.isActive;
  await med.save();

  res.json({
    success: true,
    message: `Medication "${med.name}" is now ${med.isActive ? "active" : "inactive"}`,
    data: med,
  });
};

module.exports = { addMedication, getMedications, toggleMedication };
