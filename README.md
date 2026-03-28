# betting-game
Betting Card Game 
MERN Stack Summary Overview: A full-stack web application built using
MongoDB, Express.js, React.js, and Node.js. The platform allows users to play a card matching
game with a betting system and wallet management. 

Key Features: 
1. Authentication: - User
signup/login using JWT - Role-based access (user/admin) 
2. Wallet System: - Add money -
Withdraw money - Balance tracking 
3. Game Logic: - 10 cards (2 rows of 5) - Unique numbers per
row, same numbers shuffled - Match system with anti-cheat 
fairness 
4. Betting System: - Max bet ■5000 - Dynamic reward calculation (e.g., ■10 → ■30) 
5.Admin Panel: - View users - Update wallet balance - Manage users 

Backend: - Node.js + Express -
MongoDB (Mongoose) - JWT authentication - REST APIs Frontend: - React.js - Context API for
auth -  - Helmet for security, Error handling - 

Environment-based config Deployment: - 
Backend
Render  - https://betting-game-joks.onrender.com/
Frontend:
Vercel - https://betting-game-sigma.vercel.app/

Conclusion: This project demonstrates full-stack development, secure
authentication, game logic design, and real-world application structure suitable for interviews and
deploymen