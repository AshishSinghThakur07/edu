import { Request, Response } from 'express';
import prisma from '../config/db';
import { createAssignmentSchema } from '../schemas/assignment.schema';

// @desc    Get assignments for a class
// @route   GET /api/assignments
// @access  Private
export const getAssignments = async (req: Request, res: Response): Promise<void> => {
    try {
        const { class_id } = req.query;
        const where: any = {};
        if (class_id) where.classId = String(class_id);

        const assignments = await prisma.assignment.findMany({
            where,
            include: { class: { select: { name: true } } }
        });
        res.json(assignments);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an assignment
// @route   POST /api/assignments
// @access  Private (Teacher)
export const createAssignment = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = createAssignmentSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: 'Validation Error', errors: validation.error.format() });
            return;
        }
        const { class_id, title, description, due_date } = validation.data;

        const assignment = await prisma.assignment.create({
            data: {
                classId: class_id,
                title,
                description,
                dueDate: due_date ? new Date(due_date) : undefined
            }
        });

        res.status(201).json(assignment);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
