import { Request, Response } from 'express';
import prisma from '../config/db';
import { createJobSchema } from '../schemas/job.schema';

// @desc    Get all job postings
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req: Request, res: Response): Promise<void> => {
    try {
        const jobs = await prisma.jobPosting.findMany({
            include: { institution: { select: { name: true } } }
        });
        res.json(jobs);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a job posting
// @route   POST /api/jobs
// @access  Private (Admin/HR)
export const createJob = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = createJobSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: 'Validation Error', errors: validation.error.format() });
            return;
        }
        const { institution_id, title, description, closing_at } = validation.data;

        const job = await prisma.jobPosting.create({
            data: {
                institutionId: institution_id,
                title,
                description,
                closingAt: closing_at ? new Date(closing_at) : undefined
            }
        });

        res.status(201).json(job);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
