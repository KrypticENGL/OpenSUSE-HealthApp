/**
 * controllers/aiController.js
 *
 * Triggers an AI-powered vitals trend analysis for a patient.
 * Uses Google Gemini (gemini-1.5-flash) via @google/generative-ai SDK.
 *
 *   GET /api/ai-insight/:patientId
 *
 * Behaviour:
 *   1. Fetches the latest vitals reading (snapshot)
 *   2. Fetches the last 7 days of readings to describe the trend
 *   3. Builds a structured prompt per the VitalView specification
 *   4. Calls Gemini and returns a 2-sentence plain-language health insight
 */

const Vitals = require("../models/Vitals");
const Patient = require("../models/Patient");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// ── Initialise Gemini client (lazy — only used when endpoint is hit) ──────────
const getGeminiClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper: Build 7-day trend description from vitals array
// ─────────────────────────────────────────────────────────────────────────────
const buildTrendDescription = (readings) => {
  if (!readings || readings.length === 0) {
    return "No trend data available — this is the first recorded reading.";
  }

  const criticalCount = readings.filter((r) => r.status === "Critical").length;
  const warningCount = readings.filter((r) => r.status === "Warning").length;
  const normalCount = readings.filter((r) => r.status === "Normal").length;

  const avgHR =
    Math.round(readings.reduce((s, r) => s + r.heartRate, 0) / readings.length);
  const avgSpO2 =
    Math.round(readings.reduce((s, r) => s + r.spo2, 0) / readings.length);
  const avgGlucose =
    Math.round(readings.reduce((s, r) => s + r.glucose, 0) / readings.length);

  const avgSystolic = Math.round(
    readings.reduce((s, r) => s + r.bloodPressure.systolic, 0) / readings.length
  );
  const avgDiastolic = Math.round(
    readings.reduce((s, r) => s + r.bloodPressure.diastolic, 0) / readings.length
  );

  return (
    `Over the last 7 days (${readings.length} readings): ` +
    `${criticalCount} critical, ${warningCount} warning, ${normalCount} normal. ` +
    `Average HR: ${avgHR} bpm, BP: ${avgSystolic}/${avgDiastolic} mmHg, ` +
    `SpO2: ${avgSpO2}%, Glucose: ${avgGlucose} mg/dL.`
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/ai-insight/:patientId — Generate AI health insight
// ─────────────────────────────────────────────────────────────────────────────
const getAIInsight = async (req, res) => {
  const { patientId } = req.params;

  // ── 1. Verify patient ──────────────────────────────────────────────────────
  const patient = await Patient.findById(patientId);
  if (!patient) {
    return res.status(404).json({
      success: false,
      error: "Patient not found",
    });
  }

  // ── 2. Get latest vitals snapshot ──────────────────────────────────────────
  const latestVitals = await Vitals.findOne({ patientId }).sort({ recordedAt: -1 });
  if (!latestVitals) {
    return res.status(404).json({
      success: false,
      error: "No vitals found for this patient. Log at least one reading first.",
    });
  }

  // ── 3. Get 7-day trend data ────────────────────────────────────────────────
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const trendReadings = await Vitals.find({
    patientId,
    recordedAt: { $gte: sevenDaysAgo },
  }).sort({ recordedAt: -1 });

  const trendDescription = buildTrendDescription(trendReadings);

  // ── 4. Build structured prompt ─────────────────────────────────────────────
  const bpString = `${latestVitals.bloodPressure.systolic}/${latestVitals.bloodPressure.diastolic} mmHg`;

  const prompt =
    `Patient vitals: HR ${latestVitals.heartRate} BPM, BP ${bpString}, ` +
    `SpO2 ${latestVitals.spo2}%, Glucose ${latestVitals.glucose} mg/dL. ` +
    `7-day trend: ${trendDescription} ` +
    `Give a 2-sentence health insight in simple language.`;

  // ── 5. Call Gemini API ─────────────────────────────────────────────────────
  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const insight = result.response.text().trim();

    return res.json({
      success: true,
      patient: {
        id: patient._id,
        name: patient.name,
      },
      latestVitals: {
        heartRate: latestVitals.heartRate,
        bloodPressure: bpString,
        spo2: latestVitals.spo2,
        glucose: latestVitals.glucose,
        status: latestVitals.status,
        recordedAt: latestVitals.recordedAt,
      },
      trendSummary: trendDescription,
      insight,          // The Gemini-generated 2-sentence response
      promptUsed: prompt, // Exposed for debugging / audit
    });
  } catch (aiError) {
    console.error("[AI] Gemini API error:", aiError.message);
    return res.status(502).json({
      success: false,
      error: "AI service unavailable. Check your GEMINI_API_KEY and try again.",
      details: aiError.message,
    });
  }
};

module.exports = { getAIInsight };
