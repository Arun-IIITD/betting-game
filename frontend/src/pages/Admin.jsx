import { useEffect, useState } from "react";
import API from "../api/axios";
import "./admin.css";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [amounts, setAmounts] = useState({});

  const fetchUsers = async () => {
    const { data } = await API.get("/admin/users");
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

//   const updateWallet = async (id) => {
//     await API.post("/admin/update-wallet", {
//       userId: id,
//       amount: Number(amount)
//     });

//     fetchUsers();
//   };

  const updateWallet = async (id) => {
  await API.post("/admin/update-wallet", {
    userId: id,
    amount: Number(amounts[id])
  });

  fetchUsers();
};

  return (
    <div className="container">
      <div className="card">
        <h2>Admin Panel</h2>

        {users.map((u) => (
          <div key={u._id}>
            <p>{u.email} | ₹{u.wallet}</p>

         

            <input
                className="input"
                placeholder="Amount"
                value={amounts[u._id] || ""}
                onChange={(e) =>
                    setAmounts({ ...amounts, [u._id]: e.target.value })
                }
                />

            <button className="button" onClick={() => updateWallet(u._id)}>
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}