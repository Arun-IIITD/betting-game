const express = require("express");
const { addMoney, withdraw } = require("../controllers/walletController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/add", protect, addMoney);
router.post("/withdraw", protect, withdraw);
router.get("/me", protect, async (req, res) => {
  res.json({ wallet: req.user.wallet });
});


module.exports = router;