const Timetable = require('../models/Timetable');
const Class = require('../models/Class');

// @desc    Get timetable for a specific class or teacher
// @route   GET /api/schedule/timetable
// @access  Private
const getTimetable = async (req, res) => {
    try {
        const { class_id, teacher_id } = req.query;
        let query = {};

        if (class_id) query.class_id = class_id;
        if (teacher_id) query.teacher_id = teacher_id;

        const timetable = await Timetable.find(query)
            .populate('class_id', 'name')
            .populate('teacher_id', 'name');

        res.json(timetable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a timetable entry
// @route   POST /api/schedule/timetable
// @access  Private (Admin/Teacher)
const createTimetableEntry = async (req, res) => {
    try {
        const { class_id, day, start_time, end_time, teacher_id } = req.body;

        const entry = await Timetable.create({
            class_id,
            day,
            start_time,
            end_time,
            teacher_id
        });

        res.status(201).json(entry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getTimetable, createTimetableEntry };
