import { Request, Response } from 'express';
import prisma from '../config/db';
import { applyJobSchema } from '../schemas/job.schema';

// @desc    Apply for a job
// @route   POST /api/jobs/apply
// @access  Private
export const applyForJob = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = applyJobSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: 'Validation Error', errors: validation.error.format() });
            return;
        }
        const { jobposting_id, candidate_id, resume_url } = validation.data;

        // Check if already applied
        const existing = await prisma.application.findFirst({
            where: {
                jobPostingId: jobposting_id,
                candidateId: candidate_id
            }
        });

        if (existing) {
            res.status(400).json({ message: 'Already applied for this job' });
            return;
        }

        const application = await prisma.application.create({
            data: {
                jobPostingId: jobposting_id,
                candidateId: candidate_id,
                resumeUrl: resume_url
            }
        });

        res.status(201).json(application);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get applications for a job
// @route   GET /api/jobs/:id/applications
// @access  Private (Admin/HR)
export const getApplications = async (req: Request, res: Response): Promise<void> => {
    try {
        const applications = await prisma.application.findMany({
            where: { jobPostingId: req.params.id },
            include: { candidate: { select: { name: true, email: true } } }
        });
        res.json(applications);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
