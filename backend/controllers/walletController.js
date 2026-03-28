const User = require("../models/User");

const addMoney = async (req, res) => {
  const { amount } = req.body;
  console.log("in wallet controller",amount);

  const user = await User.findById(req.user.id);
  user.wallet += amount;

  await user.save();

  res.json(user);
};

const withdraw = async (req, res) => {
  const { amount } = req.body;
  console.log("in wallet controller",amount);
  const user = await User.findById(req.user.id);

  if (user.wallet < amount)
    return res.status(400).json({ msg: "Insufficient balance" });

  user.wallet -= amount;
  await user.save();

  res.json(user);
};

module.exports = { addMoney, withdraw };