/**
 * models/Medication.js — Medication Schema
 *
 * Tracks a patient's prescribed medications.
 * The `timeSlots` array is automatically populated by the
 * `autoScheduleTimeSlots` helper based on the provided `frequency`.
 */

const mongoose = require("mongoose");
const { autoScheduleTimeSlots } = require("../utils/autoScheduler");

const VALID_TIME_SLOTS = ["Morning", "Afternoon", "Evening", "Night"];

const medicationSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient ID is required"],
      index: true,
    },
    name: {
      type: String,
      required: [true, "Medication name is required"],
      trim: true,
    },
    dosage: {
      type: String,
      required: [true, "Dosage is required"],
      trim: true,
      // e.g. "500mg", "10ml"
    },
    frequency: {
      type: String,
      required: [true, "Frequency is required"],
      trim: true,
      // e.g. "Once a day", "Twice a day", "Three times a day", "Four times a day"
    },
    timeSlots: {
      type: [String],
      enum: {
        values: VALID_TIME_SLOTS,
        message: "{VALUE} is not a valid time slot",
      },
      default: [],
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    instructions: {
      type: String,
      trim: true,
      default: "",
      // e.g. "Take after meals", "Do not crush"
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Pre-save Hook: auto-generate timeSlots from frequency ────────────────────
medicationSchema.pre("save", function (next) {
  // Only auto-schedule if timeSlots was not manually overridden by the caller
  if (!this.timeSlots || this.timeSlots.length === 0) {
    this.timeSlots = autoScheduleTimeSlots(this.frequency);
  }
  next();
});

// ── Virtual: Human-readable schedule summary ─────────────────────────────────
medicationSchema.virtual("scheduleSummary").get(function () {
  return `${this.name} ${this.dosage} — ${this.frequency} [${this.timeSlots.join(", ")}]`;
});

module.exports = mongoose.model("Medication", medicationSchema);
