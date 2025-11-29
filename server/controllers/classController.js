const Class = require('../models/Class');

// @desc    Get all classes
// @route   GET /api/classes
// @access  Private
const getClasses = async (req, res) => {
    try {
        const classes = await Class.find().populate('course_id', 'title');
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new class
// @route   POST /api/classes
// @access  Private (Admin/Teacher)
const createClass = async (req, res) => {
    try {
        const { name, course_id } = req.body;

        const newClass = await Class.create({
            name,
            course_id
        });

        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getClasses, createClass };
