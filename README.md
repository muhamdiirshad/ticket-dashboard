📘 Ticket Dashboard

A mini project management dashboard inspired by Trello/Atlassian — built with Node.js (TypeScript), React (TypeScript), Redux, and MongoDB.
It includes email-based OTP authentication, project & ticket management, super-user controls, and real-time notifications.

🚀 Features
🧾 Step 1 — Authentication

Email-based OTP login (no password required)

Verifies OTP → auto-login → access to dashboard

📂 Step 2 — Projects & Tickets

Project dashboard showing all projects

Create a new project when none exists

Each project contains multiple tickets with descriptions

Drag & drop tickets between columns (Todo, In Progress, Done)

Real-time updates via Socket.IO

🔐 Step 3 — Super-User Mode

Toggle ON/OFF for super-user view

ON → shows who created/updated tickets

OFF → hides that info

Toggling ON requires password verification (SUPERUSER_PASSWORD from .env)

🔔 Step 4 — Notifications & Updates

Real-time notifications for active users (Socket.IO)

Email notifications for offline users (via Nodemailer)

Activity feed logs all ticket updates instantly

🧩 Step 5 — Design & UI

Clean, minimal interface based on Figma design

Built with React + Redux + TypeScript

Styled with plain CSS (no heavy animations)

Responsive, professional layout for all screen sizes

🧱 Tech Stack
Layer	Technology
Frontend	React + Vite + TypeScript + Redux Toolkit + CSS
Backend	Node.js + Express + TypeScript
Database	MongoDB (NoSQL)
Realtime	Socket.IO
Email	Nodemailer (SMTP via Gmail)
🗂 Folder Structure
ticket-dashboard/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── config/
│   │   └── server.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── features/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── app/
│   │   └── main.tsx
│   └── package.json
│
└── README.md

⚙️ Environment Setup
Backend (backend/.env)
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ticket-dashboard
JWT_SECRET=your_jwt_secret
OTP_EXPIRES_MINUTES=5

# SMTP (for sending OTP emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL="Ticket Dashboard <yourgmail@gmail.com>"

# Superuser password
SUPERUSER_PASSWORD=YourStrongPassword

Frontend (frontend/.env)
VITE_API_URL=http://localhost:5000

🧰 Installation
1️⃣ Backend
cd backend
npm install
npm run dev

2️⃣ Frontend
cd frontend
npm install
npm run dev


Open in browser → http://localhost:5173

🧠 Design Patterns Used

Factory Pattern → Ticket creation factory for centralized and scalable logic

Strategy Pattern → Notification handling (UI notifications vs Email)

🧩 Database Choice: MongoDB (NoSQL)

✅ Chosen for flexibility in schema design — ideal for tickets and projects with dynamic properties.
✅ Supports real-time scalable data via change streams and fast document updates.
❌ SQL was not chosen due to rigid schema and slower iteration speed for this type of project.

🖥️ Deployment
Frontend → Vercel / Netlify

Build: npm run build

Output: /dist

Environment variable: VITE_API_URL=https://your-backend-url.com

Backend → Render / Railway / Heroku

Environment variables same as .env

Start command: npm start (after building)

🧾 Evaluation Criteria
Criteria	Description
Backend logic & design	Node + TypeScript + MongoDB + clean structure
Super-user toggle	Secure, password-based, real-time switch
Notifications	Real-time + email fallback
Frontend architecture	React + Redux + modular
Code quality	Clean, scalable, with patterns
Deployment	Working full-stack project
🧑‍💻 Developer

Muhamdi Irshad
Email: your-email@example.com

GitHub: github.com/muhamdiirshad

📎 Submission

GitHub Repo (Public): https://github.com/muhamdiirshad/ticket-dashboard


✅ Now just run this to add it:

echo "README.md" >> .gitignore
# (only if not yet added)
git add README.md
git commit -m "Add final README for submission"
git push
