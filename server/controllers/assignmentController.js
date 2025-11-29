const Assignment = require('../models/Assignment');
const Class = require('../models/Class');

// @desc    Get assignments for a class
// @route   GET /api/assignments
// @access  Private
const getAssignments = async (req, res) => {
    try {
        const { class_id } = req.query;
        let query = {};
        if (class_id) query.class_id = class_id;

        const assignments = await Assignment.find(query).populate('class_id', 'name');
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an assignment
// @route   POST /api/assignments
// @access  Private (Teacher)
const createAssignment = async (req, res) => {
    try {
        const { class_id, title, description, due_date } = req.body;

        const assignment = await Assignment.create({
            class_id,
            title,
            description,
            due_date
        });

        res.status(201).json(assignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getAssignments, createAssignment };
