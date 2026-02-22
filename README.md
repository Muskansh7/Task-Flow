# 🚀 TaskFlow – Full Stack Task Management App

TaskFlow is a full-stack task management application built with **Next.js (Frontend)** and **Node.js + Express + MongoDB (Backend)**.  
Users can register, login securely using JWT authentication, manage tasks, and create flashcards.

---

## 🌐 Live Demo
Frontend (Vercel): https://your-vercel-url.vercel.app  
Backend (Render): https://your-render-url.onrender.com  

---

## 🛠 Tech Stack
- Next.js (TypeScript)
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- Axios
- Vercel (Frontend Deployment)
- Render (Backend Deployment)

---

## ✨ Features
- 🔐 User Authentication (Register / Login)
- 📝 Create, Update, Delete Tasks
- 📚 Flashcard Management
- 🔑 Protected Routes using JWT
- 🌍 Fully deployed production setup

---

## ⚙️ Environment Variables

### Backend (.env)
MONGODB_URI=your_mongodb_uri  
JWT_SECRET=your_secret_key  

### Frontend (Vercel)
NEXT_PUBLIC_API_URL=https://your-render-backend-url.onrender.com/api  

---

## 🚀 Run Locally

```bash
git clone https://github.com/yourusername/task-flow.git
cd task-flow

# Install dependencies
npm install
cd client && npm install
cd ../server && npm install

# Start backend
cd server
npm start

# Start frontend
cd client
npm run dev
```

---

## 👩‍💻 Author
Muskan  
GitHub: https://github.com/yourusername  

---

This project demonstrates full-stack development, secure authentication, REST API design, and production deployment.
