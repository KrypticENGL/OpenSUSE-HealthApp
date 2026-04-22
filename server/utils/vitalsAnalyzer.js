/**
 * utils/vitalsAnalyzer.js — Vitals Status Engine
 *
 * Determines whether a vitals reading is Normal, Warning, or Critical
 * based on standard medical reference ranges.
 *
 * Priority: Critical > Warning > Normal
 * (A single critical value makes the entire reading Critical.)
 *
 * Medical Reference Ranges:
 * ─────────────────────────────────────────────────────────────────────
 * HEART RATE (bpm)
 *   Normal   : 60 – 100
 *   Warning  : 50 – 59 | 101 – 120
 *   Critical : < 50    | > 120
 *
 * SYSTOLIC BP (mmHg)
 *   Normal   : 90 – 120
 *   Warning  : 121 – 139 | 80 – 89
 *   Critical : ≥ 140      | < 80
 *
 * DIASTOLIC BP (mmHg)
 *   Normal   : 60 – 80
 *   Warning  : 81 – 89
 *   Critical : ≥ 90 | < 60
 *
 * SpO2 (%)
 *   Normal   : ≥ 95
 *   Warning  : 92 – 94
 *   Critical : < 92
 *
 * GLUCOSE (mg/dL — fasting context)
 *   Normal   : 70 – 100
 *   Warning  : 101 – 125 | 55 – 69
 *   Critical : ≥ 126      | < 55
 * ─────────────────────────────────────────────────────────────────────
 */

const STATUS = {
  NORMAL: "Normal",
  WARNING: "Warning",
  CRITICAL: "Critical",
};

/**
 * Evaluates the status of Heart Rate.
 * @param {number} hr - Heart rate in bpm
 * @returns {"Normal"|"Warning"|"Critical"}
 */
const checkHeartRate = (hr) => {
  if (hr < 50 || hr > 120) return STATUS.CRITICAL;
  if ((hr >= 50 && hr < 60) || (hr > 100 && hr <= 120)) return STATUS.WARNING;
  return STATUS.NORMAL;
};

/**
 * Evaluates the status of Blood Pressure.
 * @param {number} systolic
 * @param {number} diastolic
 * @returns {"Normal"|"Warning"|"Critical"}
 */
const checkBloodPressure = (systolic, diastolic) => {
  if (systolic >= 140 || systolic < 80) return STATUS.CRITICAL;
  if (diastolic >= 90 || diastolic < 60) return STATUS.CRITICAL;
  if (systolic >= 121 || (systolic >= 80 && systolic < 90))
    return STATUS.WARNING;
  if (diastolic >= 81) return STATUS.WARNING;
  return STATUS.NORMAL;
};

/**
 * Evaluates the status of SpO2.
 * @param {number} spo2 - SpO2 percentage
 * @returns {"Normal"|"Warning"|"Critical"}
 */
const checkSpO2 = (spo2) => {
  if (spo2 < 92) return STATUS.CRITICAL;
  if (spo2 < 95) return STATUS.WARNING;
  return STATUS.NORMAL;
};

/**
 * Evaluates the status of Blood Glucose.
 * @param {number} glucose - Glucose in mg/dL
 * @returns {"Normal"|"Warning"|"Critical"}
 */
const checkGlucose = (glucose) => {
  if (glucose >= 126 || glucose < 55) return STATUS.CRITICAL;
  if ((glucose >= 101 && glucose < 126) || (glucose >= 55 && glucose < 70))
    return STATUS.WARNING;
  return STATUS.NORMAL;
};

/**
 * Aggregates individual metric statuses into one overall status.
 * Critical takes priority, then Warning, then Normal.
 *
 * @param {object} params
 * @param {number} params.heartRate
 * @param {number} params.systolic
 * @param {number} params.diastolic
 * @param {number} params.spo2
 * @param {number} params.glucose
 * @returns {"Normal"|"Warning"|"Critical"}
 */
const analyzeVitals = ({ heartRate, systolic, diastolic, spo2, glucose }) => {
  const statuses = [
    checkHeartRate(heartRate),
    checkBloodPressure(systolic, diastolic),
    checkSpO2(spo2),
    checkGlucose(glucose),
  ];

  if (statuses.includes(STATUS.CRITICAL)) return STATUS.CRITICAL;
  if (statuses.includes(STATUS.WARNING)) return STATUS.WARNING;
  return STATUS.NORMAL;
};

/**
 * Returns a detailed breakdown of each metric's status.
 * Useful for response payloads so the client knows which metric triggered a flag.
 *
 * @param {object} params
 * @returns {object} breakdown - Per-metric status map
 */
const analyzeVitalsDetailed = ({
  heartRate,
  systolic,
  diastolic,
  spo2,
  glucose,
}) => {
  return {
    heartRate: {
      value: heartRate,
      unit: "bpm",
      status: checkHeartRate(heartRate),
    },
    bloodPressure: {
      value: `${systolic}/${diastolic}`,
      unit: "mmHg",
      status: checkBloodPressure(systolic, diastolic),
    },
    spo2: {
      value: spo2,
      unit: "%",
      status: checkSpO2(spo2),
    },
    glucose: {
      value: glucose,
      unit: "mg/dL",
      status: checkGlucose(glucose),
    },
  };
};

module.exports = { analyzeVitals, analyzeVitalsDetailed };
