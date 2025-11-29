const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Get dashboard stats for current user
router.get('/stats', protect, async (req, res) => {
    try {
        const userId = req.user._id;
        const userRole = req.user.role;

        // Import models
        const Timetable = require('../models/Timetable');
        const Assignment = require('../models/Assignment');
        const Attendance = require('../models/Attendance');

        // Get upcoming classes count
        const upcomingClasses = await Timetable.countDocuments({
            day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
        });

        // Get assignments due (pending assignments)
        const assignmentsDue = await Assignment.countDocuments({
            due_date: { $gte: new Date() },
        });

        // Calculate attendance percentage
        const totalAttendance = await Attendance.countDocuments({ user_id: userId });
        const presentCount = await Attendance.countDocuments({ user_id: userId, status: 'PRESENT' });
        const attendancePercentage = totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0;

        res.json({
            upcomingClasses: upcomingClasses || 0,
            assignmentsDue: assignmentsDue || 0,
            attendancePercentage: attendancePercentage || 0,
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
