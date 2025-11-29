import { Request, Response } from 'express';
import prisma from '../config/db';
import { createCourseSchema } from '../schemas/academic.schema';

// @desc    Get all courses
// @route   GET /api/academic/courses
// @access  Private
export const getCourses = async (req: Request, res: Response): Promise<void> => {
    try {
        const courses = await prisma.course.findMany({
            include: { institution: { select: { name: true } } }
        });
        res.json(courses);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new course
// @route   POST /api/academic/courses
// @access  Private (Admin/Teacher)
export const createCourse = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = createCourseSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: 'Validation Error', errors: validation.error.format() });
            return;
        }
        const { title, description, institution_id } = validation.data;

        const course = await prisma.course.create({
            data: {
                title,
                description,
                institutionId: institution_id
            }
        });

        res.status(201).json(course);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
