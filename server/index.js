const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`📨 [${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (req.body && Object.keys(req.body).length > 0) {
        const sanitizedBody = { ...req.body };
        if (sanitizedBody.password) sanitizedBody.password = '***';
        console.log('📦 [REQUEST] Body:', sanitizedBody);
    }
    next();
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/academic', require('./routes/academicRoutes'));
app.use('/api/schedule', require('./routes/scheduleRoutes'));
app.use('/api/assignments', require('./routes/assignmentRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log('🚀 ========================================');
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🚀 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🚀 MongoDB: ${process.env.MONGO_URI ? 'Connected' : 'Not configured'}`);
        console.log('🚀 ========================================');
    });
}

module.exports = app;
