import { Request, Response } from 'express';
import prisma from '../config/db';
import { submitAssignmentSchema } from '../schemas/assignment.schema';

// @desc    Submit an assignment
// @route   POST /api/assignments/submit
// @access  Private (Student)
export const submitAssignment = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = submitAssignmentSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: 'Validation Error', errors: validation.error.format() });
            return;
        }
        const { assignment_id, student_id, content, file_url } = validation.data;

        // Check if already submitted
        const existing = await prisma.submission.findUnique({
            where: {
                assignmentId_studentId: {
                    assignmentId: assignment_id,
                    studentId: student_id
                }
            }
        });

        if (existing) {
            res.status(400).json({ message: 'Assignment already submitted' });
            return;
        }

        const submission = await prisma.submission.create({
            data: {
                assignmentId: assignment_id,
                studentId: student_id,
                content,
                fileUrl: file_url
            }
        });

        res.status(201).json(submission);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get submissions for an assignment
// @route   GET /api/assignments/:id/submissions
// @access  Private (Teacher)
export const getSubmissions = async (req: Request, res: Response): Promise<void> => {
    try {
        const submissions = await prisma.submission.findMany({
            where: { assignmentId: req.params.id },
            include: { student: { select: { name: true, email: true } } }
        });
        res.json(submissions);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
