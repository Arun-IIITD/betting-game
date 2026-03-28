const express = require("express");
const User = require("../models/User");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/users", protect, adminOnly, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

router.post("/update-wallet", protect, adminOnly, async (req, res) => {
  const { userId, amount } = req.body;

  const user = await User.findById(userId);

  if (!user) return res.status(404).json({ msg: "User not found" });

  user.wallet = amount;
  await user.save();

  res.json({ msg: "Wallet updated", user });
});



router.get("/stats", protect, adminOnly, async (req, res) => {
  const users = await User.find();

  const totalUsers = users.length;
  const totalBalance = users.reduce((sum, u) => sum + u.wallet, 0);

  res.json({
    totalUsers,
    totalBalance
  });
});

module.exports = router;
