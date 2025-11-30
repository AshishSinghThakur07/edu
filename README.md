# Academere

A comprehensive Education Management System built with the PERN stack (PostgreSQL, Express, React, Node.js). This application is designed to streamline administrative tasks, manage academic schedules, track assignments, and facilitate communication within educational institutions.

## 🚀 Tech Stack

### Frontend
- **Framework:** [React](https://react.dev/) (v19) with [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** [TanStack Query](https://tanstack.com/query/latest)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** JWT (JSON Web Tokens) & Bcryptjs
- **Validation:** [Zod](https://zod.dev/)

## 📂 File Structure

```
academere/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components (shadcn/ui)
│   │   ├── hooks/         # Custom React hooks (useAuth, useCourses, etc.)
│   │   ├── lib/           # Utilities and schemas
│   │   ├── pages/         # Page components (Dashboard, Login, etc.)
│   │   ├── types/         # TypeScript definitions
│   │   ├── utils/         # Helper functions (api.ts)
│   │   └── main.tsx       # Entry point
│   └── vite.config.ts     # Vite configuration
│
├── server/                 # Backend application
│   ├── config/            # Database connection logic
│   ├── controllers/       # Route logic and request handlers
│   ├── prisma/            # Database schema and migrations
│   ├── routes/            # API route definitions
│   ├── schemas/           # Zod validation schemas
│   ├── .env               # Environment variables (git-ignored)
│   └── index.ts           # Server entry point
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js installed on your machine
- PostgreSQL database (local or cloud like Supabase/Neon)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd academere
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
DATABASE_URL="postgresql://user:password@host:port/database"
JWT_SECRET="your_jwt_secret_key"
NODE_ENV=development
```

Run database migrations:
```bash
npx prisma generate
npx prisma db push
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

The application should now be running at `http://localhost:5173`, and the backend API at `http://localhost:5000`.
