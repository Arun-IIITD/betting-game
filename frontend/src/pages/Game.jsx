import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./game.css";


export default function Game() {
  
  
  const navigate = useNavigate();
  const [row1, setRow1] = useState([]);
  const [row2, setRow2] = useState([]);

  const [selected, setSelected] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [matched, setMatched] = useState([]);

  const [bet, setBet] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  // 🎯 Generate numbers
  const generate = () => {
    let nums = [];

    while (nums.length < 5) {
      let n = Math.floor(Math.random() * 100);
      if (!nums.includes(n)) nums.push(n);
    }

    const shuffled = [...nums].sort(() => Math.random() - 0.5);

    setRow1(nums);
    setRow2(shuffled);

    setMatched([]);
    setRevealed([]);
    setSelected([]);
  };

  // ▶ Start Game
  const startGame = async () => {
    if (!bet || Number(bet) <= 0) {
      return alert("Enter valid bet");
    }

    try {
      await API.get("/game/start", {
        bet: Number(bet),
      });

      setGameStarted(true);
      generate();
    } catch (err) {
      console.log(err.response);
      alert(err.response?.data?.msg || "Failed to start game");
    }
  };

  // 🔄 Shuffle (anti-cheat)
  const shuffle = () => {
    const shuffleRow = (row) => {
      let fixed = row.filter((n) => matched.includes(n));
      let free = row.filter((n) => !matched.includes(n));

      free.sort(() => Math.random() - 0.5);

      return [...free, ...fixed];
    };

    setRow1(shuffleRow(row1));
    setRow2(shuffleRow(row2));
  };

  // 🎮 Handle Click
  const handleClick = async (value) => {
    if (!gameStarted) return;
    if (selected.length === 2) return;
    if (revealed.includes(value)) return;

    const newSel = [...selected, value];
    setSelected(newSel);
    setRevealed((prev) => [...prev, value]);

    if (newSel.length === 2) {
      setTimeout(async () => {
        try {
          if (newSel[0] === newSel[1]) {
            // ✅ MATCH
            setMatched((prev) => [...prev, newSel[0]]);

            await API.post("/game/result", {
              bet: Number(bet),
              win: true,
            });

            alert("You won!");
          } else {
            // ❌ NOT MATCH
            setRevealed((prev) =>
              prev.filter((v) => !newSel.includes(v))
            );

            await API.post("/game/result", {
              bet: Number(bet),
              win: false,
            });

            alert("You lost!");
          }

          setSelected([]);
          shuffle();
          setGameStarted(false);
        } catch (err) {
          console.log(err.response);
          alert("Error updating result");
        }
      }, 800);
    }
  };

  // 🧩 Render Card
  const renderCard = (n, i) => {
    const isOpen = revealed.includes(n) || matched.includes(n);

    return (
      <button
        key={i}
        className={`card-btn ${isOpen ? "open" : ""}`}
        onClick={() => handleClick(n)}
      >
        {isOpen ? n : "?"}
      </button>
    );
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Card Betting Game</h2>

        
        {!gameStarted && (
          <>
            <input
              className="input"
              placeholder="Enter Bet (max ₹5000)"
              value={bet}
              onChange={(e) => setBet(e.target.value)}
            />

            <div className="btn-row">

            <button className="button" onClick={startGame}>
              Start Game
            </button>

            <button className="button" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
            </button>

            </div>



          </>
        )}

        {/* 🎮 Game UI */}
        {gameStarted && (
          <>
            <h3>Row 1</h3>
            <div className="row">
              {row1.map((n, i) => renderCard(n, i))}
            </div>

            <h3>Row 2</h3>
            <div className="row">
              {row2.map((n, i) => renderCard(n, i))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}