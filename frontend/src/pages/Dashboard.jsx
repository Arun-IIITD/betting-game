import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [wallet, setWallet] = useState(0);
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  
  const fetchWallet = async () => {
    try {
      const { data } = await API.get("/wallet/me");
      setWallet(data.wallet);
    } catch {
      alert("Error fetching wallet");
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  // Add Money
  const addMoney = async () => {
    await API.post("/wallet/add", { amount: Number(amount) });
    fetchWallet();
  };

  // Withdraw
  const withdraw = async () => {
    await API.post("/wallet/withdraw", { amount: Number(amount) });
    fetchWallet();
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Dashboard</h2>

        <p><b>Email:</b> {user?.email}</p>
        <p><b>Wallet:</b> ₹{user?.wallet}</p>

        <input
          className="input"
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* <button className="button" onClick={addMoney}>
          Add Money
        </button>

        <button className="button" onClick={withdraw}>
          Withdraw
        </button>

        <button className="button" onClick={() => navigate("/game")}>
          Play Game
        </button>

        {user?.role === "admin" && (
          <button className="button" onClick={() => navigate("/admin")}>
            Go to Admin
          </button>
        )}

        <button
        className="button"
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Logout
      </button> */}



      {/* Money Actions */}
  <div className="btn-row">

      <button className="button" onClick={addMoney}>
        Add 
      </button>

      <button className="button" onClick={withdraw}>
        Withdraw
      </button>
  </div>

{/* Game & Admin */}
    <div className="btn-row">
      <button className="button" onClick={() => navigate("/game")}>
        Play Game
      </button>

      {user?.role === "admin" && (
        <button className="button" onClick={() => navigate("/admin")}>
          Admin
        </button>
      )}
    </div>



      </div>
    </div>
  );
}