/**
 * utils/autoScheduler.js — Medication Time-Slot Auto-Scheduler
 *
 * Maps a human-readable frequency string to a set of time slots.
 * This is the "smart" helper that populates the Medication.timeSlots array.
 *
 * Supported Frequency Patterns:
 * ────────────────────────────────────────────────────────────────
 *  Frequency String          → Time Slots
 * ────────────────────────────────────────────────────────────────
 *  "Once a day"              → ["Morning"]
 *  "Once daily"              → ["Morning"]
 *  "Twice a day"             → ["Morning", "Night"]
 *  "Twice daily"             → ["Morning", "Night"]
 *  "BID" / "BD"              → ["Morning", "Night"]
 *  "Three times a day"       → ["Morning", "Afternoon", "Night"]
 *  "TID" / "TDS"             → ["Morning", "Afternoon", "Night"]
 *  "Thrice a day"            → ["Morning", "Afternoon", "Night"]
 *  "Four times a day"        → ["Morning", "Afternoon", "Evening", "Night"]
 *  "QID" / "QDS"             → ["Morning", "Afternoon", "Evening", "Night"]
 *  "Morning"                 → ["Morning"]
 *  "Night" / "Bedtime"       → ["Night"]
 *  "Morning and Night"       → ["Morning", "Night"]
 *  "Alternate day"           → ["Morning"]   (one slot; doctor tracks cadence)
 *  "Weekly"                  → ["Morning"]
 * ────────────────────────────────────────────────────────────────
 * Any unrecognised frequency defaults to ["Morning"] and logs a warning.
 */

const TIME_SLOTS = {
  MORNING: "Morning",
  AFTERNOON: "Afternoon",
  EVENING: "Evening",
  NIGHT: "Night",
};

/**
 * Mapping table: normalised frequency keyword → time slots array.
 * Keys are lowercase for case-insensitive matching.
 */
const FREQUENCY_MAP = [
  // ── Once a day ────────────────────────────────────────────────
  { keywords: ["once a day", "once daily", "od", "qd"], slots: [TIME_SLOTS.MORNING] },

  // ── Twice a day ───────────────────────────────────────────────
  {
    keywords: ["twice a day", "twice daily", "two times a day", "bid", "bd", "morning and night"],
    slots: [TIME_SLOTS.MORNING, TIME_SLOTS.NIGHT],
  },

  // ── Three times a day ─────────────────────────────────────────
  {
    keywords: [
      "three times a day",
      "thrice a day",
      "thrice daily",
      "tid",
      "tds",
      "3 times a day",
      "three times daily",
    ],
    slots: [TIME_SLOTS.MORNING, TIME_SLOTS.AFTERNOON, TIME_SLOTS.NIGHT],
  },

  // ── Four times a day ──────────────────────────────────────────
  {
    keywords: ["four times a day", "4 times a day", "qid", "qds", "four times daily"],
    slots: [TIME_SLOTS.MORNING, TIME_SLOTS.AFTERNOON, TIME_SLOTS.EVENING, TIME_SLOTS.NIGHT],
  },

  // ── Specific time preference ──────────────────────────────────
  { keywords: ["morning"], slots: [TIME_SLOTS.MORNING] },
  { keywords: ["afternoon"], slots: [TIME_SLOTS.AFTERNOON] },
  { keywords: ["evening"], slots: [TIME_SLOTS.EVENING] },
  { keywords: ["night", "bedtime", "at bedtime", "hs"], slots: [TIME_SLOTS.NIGHT] },

  // ── Infrequent dosing ─────────────────────────────────────────
  {
    keywords: ["alternate day", "every other day", "eod", "weekly", "once a week"],
    slots: [TIME_SLOTS.MORNING],
  },
];

/**
 * Returns the appropriate time slots for a given frequency string.
 *
 * @param {string} frequency - The dosing frequency (case-insensitive)
 * @returns {string[]} Array of time slot strings
 */
const autoScheduleTimeSlots = (frequency) => {
  if (!frequency || typeof frequency !== "string") {
    console.warn("[AutoScheduler] Invalid frequency — defaulting to Morning");
    return [TIME_SLOTS.MORNING];
  }

  const normalised = frequency.toLowerCase().trim();

  for (const { keywords, slots } of FREQUENCY_MAP) {
    if (keywords.some((kw) => normalised.includes(kw))) {
      return slots;
    }
  }

  // Fallback: default to Morning and log for visibility
  console.warn(
    `[AutoScheduler] Unrecognised frequency "${frequency}" — defaulting to Morning`
  );
  return [TIME_SLOTS.MORNING];
};

module.exports = { autoScheduleTimeSlots, TIME_SLOTS };
