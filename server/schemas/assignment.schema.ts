import { z } from 'zod';

export const createAssignmentSchema = z.object({
    class_id: z.string().uuid("Invalid Class ID"),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    due_date: z.string().or(z.date()).optional(),
});

export const submitAssignmentSchema = z.object({
    assignment_id: z.string().uuid("Invalid Assignment ID"),
    student_id: z.string().uuid("Invalid Student ID"),
    content: z.string().optional(),
    file_url: z.string().optional(),
});
