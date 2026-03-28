import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

import "./navbar.css";

export default function Navbar() {

    
const location = useLocation();

// if (location.pathname === "/") return null;

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h2 className="logo">Card Game</h2>

      <div className="nav-links">
        {user && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/game">Game</Link>

            {user.role === "admin" && (
              <Link to="/admin">Admin</Link>
            )}

            <button
              className="logout-btn"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}