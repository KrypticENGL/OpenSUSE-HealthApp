/**
 * models/Vitals.js — Vitals Reading Schema
 *
 * Stores a single vitals snapshot for a patient.
 * The `status` field (Normal / Warning / Critical) is automatically
 * computed via the analyzeVitals helper before each save.
 *
 * Medical Reference Ranges Used:
 * ─────────────────────────────────────────────────────────────
 *  Metric          Normal              Warning           Critical
 *  Heart Rate      60–100 bpm          50–59 / 101–120   <50 / >120
 *  Systolic BP     90–120 mmHg         121–139 / 80–89   ≥140 / <80
 *  Diastolic BP    60–80 mmHg          81–89              ≥90 / <60
 *  SpO2            ≥95%                92–94%             <92%
 *  Glucose (fast)  70–100 mg/dL        101–125 / 55–69   ≥126 / <55
 * ─────────────────────────────────────────────────────────────
 */

const mongoose = require("mongoose");
const { analyzeVitals } = require("../utils/vitalsAnalyzer");

const vitalsSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient ID is required"],
      index: true,
    },
    heartRate: {
      type: Number,
      required: [true, "Heart rate (bpm) is required"],
      min: [0, "Heart rate cannot be negative"],
    },
    bloodPressure: {
      systolic: {
        type: Number,
        required: [true, "Systolic BP is required"],
        min: [0, "Systolic BP cannot be negative"],
      },
      diastolic: {
        type: Number,
        required: [true, "Diastolic BP is required"],
        min: [0, "Diastolic BP cannot be negative"],
      },
    },
    spo2: {
      type: Number,
      required: [true, "SpO2 (%) is required"],
      min: [0, "SpO2 cannot be negative"],
      max: [100, "SpO2 cannot exceed 100%"],
    },
    glucose: {
      type: Number,
      required: [true, "Glucose (mg/dL) is required"],
      min: [0, "Glucose cannot be negative"],
    },
    status: {
      type: String,
      enum: ["Normal", "Warning", "Critical"],
      default: "Normal",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    recordedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// ── Pre-save Hook: auto-compute status before persisting ─────────────────────
vitalsSchema.pre("save", function (next) {
  this.status = analyzeVitals({
    heartRate: this.heartRate,
    systolic: this.bloodPressure.systolic,
    diastolic: this.bloodPressure.diastolic,
    spo2: this.spo2,
    glucose: this.glucose,
  });
  next();
});

// ── Virtual: Blood Pressure display string ───────────────────────────────────
vitalsSchema.virtual("bpDisplay").get(function () {
  return `${this.bloodPressure.systolic}/${this.bloodPressure.diastolic} mmHg`;
});

module.exports = mongoose.model("Vitals", vitalsSchema);
