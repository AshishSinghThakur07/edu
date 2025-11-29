import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import prisma from './config/db';

import authRoutes from './routes/authRoutes';
import academicRoutes from './routes/academicRoutes';
import scheduleRoutes from './routes/scheduleRoutes';
import assignmentRoutes from './routes/assignmentRoutes';
import jobRoutes from './routes/jobRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`📨 [${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (req.body && Object.keys(req.body).length > 0) {
        const sanitizedBody = { ...req.body };
        if (sanitizedBody.password) sanitizedBody.password = '***';
        console.log('📦 [REQUEST] Body:', sanitizedBody);
    }
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/academic', academicRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

// Only listen if not imported (for testing)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log('🚀 ========================================');
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🚀 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log('🚀 Database: PostgreSQL (Prisma)');
        console.log('🚀 ========================================');
    });
}

export default app;
