import express, { Request, Response } from 'express';
import { protect } from '../middleware/authMiddleware';
import prisma from '../config/db';

const router = express.Router();

// Get dashboard stats for current user
router.get('/stats', protect, async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }
        const userId = req.user.id;
        // const userRole = req.user.role;

        const today = new Date();
        const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });

        const upcomingClasses = await prisma.timetable.count({
            where: {
                day: dayName
            }
        });

        // Get assignments due
        const assignmentsDue = await prisma.assignment.count({
            where: {
                dueDate: {
                    gte: new Date()
                }
            }
        });

        // Calculate attendance percentage
        const totalAttendance = await prisma.attendance.count({ where: { userId: userId } });
        const presentCount = await prisma.attendance.count({ where: { userId: userId, present: true } });
        const attendancePercentage = totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0;

        res.json({
            upcomingClasses: upcomingClasses || 0,
            assignmentsDue: assignmentsDue || 0,
            attendancePercentage: attendancePercentage || 0,
        });
    } catch (error: any) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
