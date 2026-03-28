const { generateCards } = require("../utils/gameLogic");
const User = require("../models/User");

const startGame = (req, res) => {
  const cards = generateCards();
  console.log("in game controller",cards);
  res.json(cards);
};

const placeBet = async (req, res) => {
  const { bet } = req.body;
  console.log("in game controller bet",bet)
  const user = await User.findById(req.user.id);

  if (bet > 5000)
    return res.status(400).json({ msg: "Max bet is 5000" });

  if (user.wallet < bet)
    return res.status(400).json({ msg: "Insufficient balance" });

  user.wallet -= bet;
  await user.save();

  res.json({ wallet: user.wallet });
};

const result = async (req, res) => {
  const { win, bet } = req.body;

  const user = await User.findById(req.user.id);

  if (win) {
    user.wallet += bet * 3;
    await user.save();
  }

  res.json(user);
};

module.exports = { startGame, placeBet, result };