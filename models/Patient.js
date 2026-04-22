/**
 * models/Patient.js — Patient (User) Schema
 *
 * Represents a registered patient in the VitalView system.
 * Stores demographic details, medical background, and emergency contact.
 */

const mongoose = require("mongoose");

const emergencyContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Emergency contact name is required"],
      trim: true,
    },
    relationship: {
      type: String,
      trim: true,
      default: "Not specified",
    },
    phone: {
      type: String,
      required: [true, "Emergency contact phone is required"],
      trim: true,
    },
  },
  { _id: false } // Embedded sub-document; no separate _id needed
);

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Patient age is required"],
      min: [0, "Age cannot be negative"],
      max: [150, "Age seems invalid"],
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "{VALUE} is not a valid blood group",
      },
    },
    knownConditions: {
      type: [String],
      default: [],
      // e.g. ["Hypertension", "Type 2 Diabetes"]
    },
    emergencyContact: {
      type: emergencyContactSchema,
      required: [true, "Emergency contact details are required"],
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: full display label
patientSchema.virtual("displayLabel").get(function () {
  return `${this.name} (${this.bloodGroup}, Age ${this.age})`;
});

module.exports = mongoose.model("Patient", patientSchema);
