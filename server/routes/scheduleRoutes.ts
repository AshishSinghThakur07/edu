import express from 'express';
import { getTimetable, createTimetableEntry } from '../controllers/timetableController';
import { markAttendance, getAttendance } from '../controllers/attendanceController';

const router = express.Router();

// Timetable
router.route('/timetable')
    .get(getTimetable)
    .post(createTimetableEntry);

// Attendance
router.route('/attendance')
    .get(getAttendance)
    .post(markAttendance);

export default router;
