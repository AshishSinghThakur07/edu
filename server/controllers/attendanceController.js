const Attendance = require('../models/Attendance');

// @desc    Mark attendance
// @route   POST /api/schedule/attendance
// @access  Private (Teacher)
const markAttendance = async (req, res) => {
    try {
        const { user_id, class_id, date, present } = req.body;

        // Check if already marked
        const existing = await Attendance.findOne({ user_id, class_id, date });
        if (existing) {
            existing.present = present;
            await existing.save();
            return res.json(existing);
        }

        const attendance = await Attendance.create({
            user_id,
            class_id,
            date,
            present
        });

        res.status(201).json(attendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get attendance records
// @route   GET /api/schedule/attendance
// @access  Private
const getAttendance = async (req, res) => {
    try {
        const { class_id, user_id, date } = req.query;
        let query = {};

        if (class_id) query.class_id = class_id;
        if (user_id) query.user_id = user_id;
        if (date) query.date = date;

        const records = await Attendance.find(query)
            .populate('user_id', 'name email')
            .populate('class_id', 'name');

        res.json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { markAttendance, getAttendance };
