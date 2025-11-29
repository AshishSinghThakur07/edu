const express = require('express');
const router = express.Router();
const { getTimetable, createTimetableEntry } = require('../controllers/timetableController');
const { markAttendance, getAttendance } = require('../controllers/attendanceController');

// Timetable
router.route('/timetable')
    .get(getTimetable)
    .post(createTimetableEntry);

// Attendance
router.route('/attendance')
    .get(getAttendance)
    .post(markAttendance);

module.exports = router;
