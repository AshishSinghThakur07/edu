import { Request, Response } from 'express';
import prisma from '../config/db';
import { markAttendanceSchema } from '../schemas/schedule.schema';

// @desc    Mark attendance
// @route   POST /api/schedule/attendance
// @access  Private (Teacher)
export const markAttendance = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = markAttendanceSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: 'Validation Error', errors: validation.error.format() });
            return;
        }
        const { user_id, class_id, date, present } = validation.data;
        const dateObj = new Date(date);

        // Check if already marked
        const existing = await prisma.attendance.findUnique({
            where: {
                userId_classId_date: {
                    userId: user_id,
                    classId: class_id,
                    date: dateObj
                }
            }
        });

        if (existing) {
            const updated = await prisma.attendance.update({
                where: { id: existing.id },
                data: { present }
            });
            res.json(updated);
            return;
        }

        const attendance = await prisma.attendance.create({
            data: {
                userId: user_id,
                classId: class_id,
                date: dateObj,
                present
            }
        });

        res.status(201).json(attendance);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get attendance records
// @route   GET /api/schedule/attendance
// @access  Private
export const getAttendance = async (req: Request, res: Response): Promise<void> => {
    try {
        const { class_id, user_id, date } = req.query;
        const where: any = {};
        if (class_id) where.classId = String(class_id);
        if (user_id) where.userId = String(user_id);
        if (date) where.date = new Date(String(date));

        const records = await prisma.attendance.findMany({
            where,
            include: {
                user: { select: { name: true, email: true } },
                class: { select: { name: true } }
            }
        });
        res.json(records);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
