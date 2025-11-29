import { z } from 'zod';

export const createJobSchema = z.object({
    institution_id: z.string().uuid("Invalid Institution ID"),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    closing_at: z.string().or(z.date()).optional(),
});

export const applyJobSchema = z.object({
    jobposting_id: z.string().uuid("Invalid Job Posting ID"),
    candidate_id: z.string().uuid("Invalid Candidate ID"),
    resume_url: z.string().optional(),
});
