const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* ---------------- CORE LOGIC ---------------- */

// Attendance %
const getPercentage = (p, t) => (p / t) * 100;

// Required classes
const getRequired = (p, t, target) =>
  Math.ceil((target * t - p * 100) / (100 - target));

// Max bunks
const getBunks = (p, t, target) =>
  Math.floor((p * 100) / target - t);

// Prediction
const getFuture = (p, t, a, b) =>
  ((p + a) / (t + a + b)) * 100;

// Risk
const getRisk = (perc) => {
  if (perc < 75) return "HIGH";
  if (perc < 80) return "WARNING";
  return "SAFE";
};

/* ---------------- API ---------------- */

// Main calculator
app.post("/calculate", (req, res) => {
  const { present, total, target = 75 } = req.body;

  const percentage = getPercentage(present, total);
  const required = getRequired(present, total, target);
  const bunks = getBunks(present, total, target);

  res.json({
    percentage,
    required,
    bunks,
    risk: getRisk(percentage)
  });
});

// Prediction
app.post("/predict", (req, res) => {
  const { present, total, attend, bunk } = req.body;

  const future = getFuture(present, total, attend, bunk);

  res.json({
    future,
    risk: getRisk(future)
  });
});

app.listen(5000, () => console.log("Server running on 5000"));