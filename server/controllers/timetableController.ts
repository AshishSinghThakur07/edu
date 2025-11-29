import { Request, Response } from 'express';
import prisma from '../config/db';
import { createTimetableSchema } from '../schemas/schedule.schema';

// @desc    Get timetable for a specific class or teacher
// @route   GET /api/schedule/timetable
// @access  Private
export const getTimetable = async (req: Request, res: Response): Promise<void> => {
    try {
        const { class_id, teacher_id } = req.query;
        const where: any = {};
        if (class_id) where.classId = String(class_id);
        if (teacher_id) where.teacherId = String(teacher_id);

        const timetable = await prisma.timetable.findMany({
            where,
            include: {
                class: { select: { name: true } },
                teacher: { select: { name: true } }
            }
        });
        res.json(timetable);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a timetable entry
// @route   POST /api/schedule/timetable
// @access  Private (Admin/Teacher)
export const createTimetableEntry = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = createTimetableSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: 'Validation Error', errors: validation.error.format() });
            return;
        }
        const { class_id, day, start_time, end_time, teacher_id } = validation.data;

        const entry = await prisma.timetable.create({
            data: {
                classId: class_id,
                day,
                startTime: start_time,
                endTime: end_time,
                teacherId: teacher_id
            }
        });

        res.status(201).json(entry);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
