const generateCards = () => {
  let numbers = [];

  while (numbers.length < 5) {
    let num = Math.floor(Math.random() * 100);
    if (!numbers.includes(num)) numbers.push(num);
  }

  let row1 = [...numbers];
  let row2 = [...numbers].sort(() => Math.random() - 0.5);

  return { row1, row2 };
};

const shuffleRows = (row) => {
  return [...row].sort(() => Math.random() - 0.5);
};

module.exports = { generateCards, shuffleRows };