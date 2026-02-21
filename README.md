# TaskFlow - Full-Stack Task Management App

A premium, responsive task management application built with Next.js (frontend) and Node.js/Express (backend).

## Features
- **JWT Authentication**: Secure login and registration with password hashing.
- **Task CRUD**: Create, read, update, and delete tasks with ease.
- **Search & Filter**: Find tasks by title or filter by status.
- **Protected Routes**: Ensuring only authenticated users can access the dashboard.
- **Premium UI**: Custom Vanilla CSS design with glassmorphism and smooth animations.
- **Responsive Design**: Works seamlessly on mobile and desktop.

## Tech Stack
- **Frontend**: Next.js 14, React, Lucide React (Icons), Axios, Vanilla CSS.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Bcrypt.js.

## Setup Instructions

### Backend
1. Navigate to the `server` directory.
2. Install dependencies: `npm install`.
3. Create a `.env` file with your `MONGODB_URI` and `JWT_SECRET`.
4. Start the server: `npm run dev` (or `node index.js`).

### Frontend
1. Navigate to the `client` directory.
2. Install dependencies: `npm install`.
3. Start the development server: `npm run dev`.
4. Open `http://localhost:3000` in your browser.

## Scaling Strategy
To scale this application for production use:
1. **Architecture**: Move from a monolithic backend to microservices (Auth, Task, User) if the load becomes significant.
2. **Database**: Implement database indexing on `userId` and `title` for faster searches. Use a managed database service like MongoDB Atlas with sharding.
3. **Caching**: Use Redis to cache frequent user sessions and task lists to reduce database load.
4. **Load Balancing**: Deploy multiple instances of the backend behind a load balancer (e.g., Nginx, AWS ELB).
5. **Security**: Implement rate limiting, CSRF protection, and HTTPS. Use HTTP-only cookies for storing tokens instead of localStorage.
6. **Testing**: Add comprehensive unit, integration, and E2E tests using Jest and Playwright.
