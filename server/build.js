/**
 * server.js — VitalView API Entry Point
 * Boots Express, connects to MongoDB, and mounts all routes.
 */

require("dotenv").config();
require("express-async-errors"); // Catch async errors without try/catch everywhere

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// ── Route Imports ──────────────────────────────────────────────────────────────
const patientRoutes = require("./routes/patientRoutes");
const vitalsRoutes = require("./routes/vitalsRoutes");
const medicationRoutes = require("./routes/medicationRoutes");
const aiRoutes = require("./routes/aiRoutes");

// ── App Initialization ──────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Health Check ────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "VitalView API is running 🩺",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// ── Mount Routes ────────────────────────────────────────────────────────────────
app.use("/api/patient", patientRoutes);
app.use("/api/vitals", vitalsRoutes);
app.use("/api/meds", medicationRoutes);
app.use("/api/ai-insight", aiRoutes);

// ── 404 Handler ─────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ── Global Error Handler ────────────────────────────────────────────────────────
app.use(errorHandler);

// ── Start Server ────────────────────────────────────────────────────────────────
const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`\n🩺  VitalView API`);
    console.log(`📡  Server    : http://localhost:${PORT}`);
    console.log(`🗄️   Database  : ${process.env.MONGO_URI}`);
    console.log(`🌿  Env       : ${process.env.NODE_ENV || "development"}\n`);
  });
};

start();
