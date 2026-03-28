const express = require("express");
const { startGame, placeBet, result } = require("../controllers/gameController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/start", protect, startGame);
router.post("/bet", protect, placeBet);
router.post("/result", protect, result);

module.exports = router;