/**
 * controllers/vitalsController.js
 *
 * Handles operations for the Vitals resource.
 *   POST /api/vitals             — Log a new vitals reading (auto-analyzes status)
 *   GET  /api/vitals/:patientId  — Fetch vitals history for a patient
 */

const Vitals = require("../models/Vitals");
const Patient = require("../models/Patient");
const { analyzeVitalsDetailed } = require("../utils/vitalsAnalyzer");

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/vitals — Log a new vitals reading
// ─────────────────────────────────────────────────────────────────────────────
const logVitals = async (req, res) => {
  const {
    patientId,
    heartRate,
    bloodPressure, // { systolic, diastolic }
    spo2,
    glucose,
    notes,
  } = req.body;

  // ── Verify patient exists ─────────────────────────────────────────────────
  const patientExists = await Patient.findById(patientId);
  if (!patientExists) {
    return res.status(404).json({
      success: false,
      error: "Patient not found. Provide a valid patientId.",
    });
  }

  // ── Create vitals (pre-save hook computes status) ─────────────────────────
  const vitals = await Vitals.create({
    patientId,
    heartRate,
    bloodPressure,
    spo2,
    glucose,
    notes,
  });

  // ── Detailed breakdown for the response ──────────────────────────────────
  const breakdown = analyzeVitalsDetailed({
    heartRate,
    systolic: bloodPressure.systolic,
    diastolic: bloodPressure.diastolic,
    spo2,
    glucose,
  });

  res.status(201).json({
    success: true,
    message: `Vitals logged with status: ${vitals.status}`,
    data: vitals,
    breakdown, // Tells the client which metric triggered a flag
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/vitals/:patientId — Fetch vitals history (newest first)
// Supports optional ?limit=N query param for sparkline use cases
// ─────────────────────────────────────────────────────────────────────────────
const getVitalsHistory = async (req, res) => {
  const { patientId } = req.params;
  const limit = parseInt(req.query.limit) || 50; // default 50 readings

  // ── Verify patient exists ─────────────────────────────────────────────────
  const patientExists = await Patient.findById(patientId);
  if (!patientExists) {
    return res.status(404).json({
      success: false,
      error: "Patient not found",
    });
  }

  const vitals = await Vitals.find({ patientId })
    .sort({ recordedAt: -1 })
    .limit(limit)
    .select("-__v");

  // ── Summary statistics for dashboard cards ────────────────────────────────
  const summary = {
    total: vitals.length,
    critical: vitals.filter((v) => v.status === "Critical").length,
    warning: vitals.filter((v) => v.status === "Warning").length,
    normal: vitals.filter((v) => v.status === "Normal").length,
    latest: vitals[0] || null,
  };

  res.json({
    success: true,
    patient: {
      id: patientExists._id,
      name: patientExists.name,
    },
    summary,
    data: vitals,
  });
};

module.exports = { logVitals, getVitalsHistory };
