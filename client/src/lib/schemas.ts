import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['STUDENT', 'TEACHER', 'HR', 'ADMIN']),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;

export const courseSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
});

export type CourseForm = z.infer<typeof courseSchema>;

export const assignmentSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    due_date: z.string().refine((date) => new Date(date) > new Date(), {
        message: "Due date must be in the future",
    }),
});

export type AssignmentForm = z.infer<typeof assignmentSchema>;

export const jobSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    location: z.string().min(2, 'Location is required'),
    type: z.enum(['FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'REMOTE']),
    closing_at: z.string().refine((date) => new Date(date) > new Date(), {
        message: "Closing date must be in the future",
    }),
});

export type JobForm = z.infer<typeof jobSchema>;
