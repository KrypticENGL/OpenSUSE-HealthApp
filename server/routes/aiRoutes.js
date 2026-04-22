/**
 * routes/aiRoutes.js
 *
 * Base: /api/ai-insight
 */

const express = require("express");
const { getAIInsight } = require("../controllers/aiController");

const router = express.Router();

// GET /api/ai-insight/:patientId  — Trigger AI trend analysis for a patient
router.get("/:patientId", getAIInsight);

module.exports = router;
