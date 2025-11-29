import { z } from 'zod';

export const createCourseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    institution_id: z.string().uuid("Invalid Institution ID"),
});

export const createClassSchema = z.object({
    name: z.string().min(1, "Name is required"),
    course_id: z.string().uuid("Invalid Course ID"),
});
