export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'STUDENT' | 'TEACHER' | 'HR' | 'ADMIN';
    bio?: string;
    phone?: string;
    course?: string;
    year?: number;
}

export interface Institution {
    _id: string;
    name: string;
}

export interface Course {
    _id: string;
    title: string;
    description: string;
    institution_id: Institution | string;
}

export interface Class {
    _id: string;
    name: string;
    course_id: Course | string;
    students: User[] | string[];
}

export interface Assignment {
    _id: string;
    class_id: Class | string;
    title: string;
    description: string;
    due_date: string;
    status?: 'PENDING' | 'SUBMITTED' | 'GRADED'; // Optional for UI
}

export interface Submission {
    _id: string;
    assignment_id: string;
    student_id: User | string;
    content: string;
    file_url?: string;
    grade?: string;
    feedback?: string;
    submitted_at: string;
}

export interface JobPosting {
    _id: string;
    institution_id: Institution | string;
    title: string;
    description: string;
    posted_at: string;
    closing_at: string;
    location?: string;
    type?: string;
}

export interface Application {
    _id: string;
    jobposting_id: string;
    candidate_id: User | string;
    resume_url: string;
    status: 'PENDING' | 'REVIEWED' | 'REJECTED' | 'ACCEPTED';
    applied_at: string;
}

export interface Timetable {
    _id: string;
    class_id: Class | string;
    teacher_id: User | string;
    day: string;
    start_time: string;
    end_time: string;
}

export interface Attendance {
    _id: string;
    user_id: User | string;
    class_id: Class | string;
    date: string;
    status: 'PRESENT' | 'ABSENT' | 'LATE';
}
