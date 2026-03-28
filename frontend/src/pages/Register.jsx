import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    adminSecret: ""
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Register failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>

        <input
          className="input"
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Optional Admin Secret */}
        <input
          className="input"
          placeholder="Admin Secret (optional)"
          onChange={(e) =>
            setForm({ ...form, adminSecret: e.target.value })
          }
        />

        <button className="button" onClick={handleRegister}>
          sign
        </button>

        <div className="link" onClick={() => navigate("/")}>
          Already have an account? Login
        </div>
      </div>
    </div>
  );
}