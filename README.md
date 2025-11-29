# EduManagement App

A comprehensive Education Management System built with the MERN stack (MongoDB, Express, React, Node.js). This application is designed to streamline administrative tasks, manage academic schedules, track assignments, and facilitate communication within educational institutions.

## 🚀 Tech Stack

### Frontend
- **Framework:** [React](https://react.dev/) (v19) with [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **PWA:** Vite PWA Plugin

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication:** JWT (JSON Web Tokens) & Bcryptjs
- **Utilities:** Dotenv, Cors, Nodemon

## 📂 File Structure

The project is organized into a monorepo-style structure with separate directories for client and server.

```
edu-management-app/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── assets/        # Static assets (images, icons)
│   │   ├── components/    # Reusable UI components
│   │   ├── config/        # App configuration (e.g., API URLs)
│   │   ├── hooks/         # Custom React hooks (e.g., useAuth)
│   │   ├── pages/         # Page components (Dashboard, Login, etc.)
│   │   ├── utils/         # Helper functions
│   │   ├── App.jsx        # Main application component
│   │   └── main.jsx       # Entry point
│   ├── public/            # Public static files
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   └── tailwind.config.js # Tailwind configuration
│
├── server/                 # Backend application
│   ├── config/            # Database connection logic
│   ├── controllers/       # Route logic and request handlers
│   ├── models/            # Mongoose database schemas
│   ├── routes/            # API route definitions
│   ├── .env               # Environment variables (git-ignored)
│   └── index.js           # Server entry point
│
├── api/                    # Vercel serverless function entry point
└── vercel.json            # Vercel deployment configuration
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js installed on your machine
- MongoDB connection string (local or Atlas)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd edu-management-app
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

Start the development server:
```bash
npm run dev
```

The application should now be running at `http://localhost:5173` (or the port shown in your terminal), and the backend API at `http://localhost:5000`.

## 🌐 Deployment

This project is configured for deployment on **Vercel**.
- The `vercel.json` file handles the configuration for deploying both the React frontend and the Express backend as serverless functions.
- The `api/` directory serves as the entry point for the backend on Vercel.

## 📝 Languages Used

- **JavaScript (ES6+):** Primary language for both frontend and backend logic.
- **HTML5:** Structure of the web pages.
- **CSS3:** Styling (via Tailwind CSS).
