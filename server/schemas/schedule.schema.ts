import { z } from 'zod';

export const createTimetableSchema = z.object({
    class_id: z.string().uuid("Invalid Class ID"),
    day: z.string().min(1, "Day is required"),
    start_time: z.string().min(1, "Start time is required"),
    end_time: z.string().min(1, "End time is required"),
    teacher_id: z.string().uuid("Invalid Teacher ID").optional(),
});

export const markAttendanceSchema = z.object({
    user_id: z.string().uuid("Invalid User ID"),
    class_id: z.string().uuid("Invalid Class ID"),
    date: z.string().or(z.date()),
    present: z.boolean(),
});
