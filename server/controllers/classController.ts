import { Request, Response } from 'express';
import prisma from '../config/db';
import { createClassSchema } from '../schemas/academic.schema';

// @desc    Get all classes
// @route   GET /api/academic/classes
// @access  Private
export const getClasses = async (req: Request, res: Response): Promise<void> => {
    try {
        const classes = await prisma.class.findMany({
            include: { course: { select: { title: true } } }
        });
        res.json(classes);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new class
// @route   POST /api/academic/classes
// @access  Private (Admin/Teacher)
export const createClass = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = createClassSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: 'Validation Error', errors: validation.error.format() });
            return;
        }
        const { name, course_id } = validation.data;

        const newClass = await prisma.class.create({
            data: {
                name,
                courseId: course_id
            }
        });

        res.status(201).json(newClass);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
