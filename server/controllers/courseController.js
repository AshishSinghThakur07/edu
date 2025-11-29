const Course = require('../models/Course');
const Institution = require('../models/Institution');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Private
const getCourses = async (req, res) => {
    try {
        // In a real app, filter by institution_id from the logged-in user
        // const courses = await Course.find({ institution_id: req.user.institution_id });
        const courses = await Course.find().populate('institution_id', 'name');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private (Admin/Teacher)
const createCourse = async (req, res) => {
    try {
        const { title, description, institution_id } = req.body;

        // Validate institution exists
        // const institution = await Institution.findById(institution_id);
        // if (!institution) {
        //   return res.status(404).json({ message: 'Institution not found' });
        // }

        const course = await Course.create({
            title,
            description,
            institution_id // Assuming passed in body for now, or derived from user
        });

        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getCourses, createCourse };
