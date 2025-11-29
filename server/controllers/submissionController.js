const Submission = require('../models/Submission');

// @desc    Submit an assignment
// @route   POST /api/assignments/submit
// @access  Private (Student)
const submitAssignment = async (req, res) => {
    try {
        const { assignment_id, student_id, content, file_url } = req.body;

        // Check if already submitted
        const existing = await Submission.findOne({ assignment_id, student_id });
        if (existing) {
            return res.status(400).json({ message: 'Assignment already submitted' });
        }

        const submission = await Submission.create({
            assignment_id,
            student_id,
            content,
            file_url
        });

        res.status(201).json(submission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get submissions for an assignment
// @route   GET /api/assignments/:id/submissions
// @access  Private (Teacher)
const getSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ assignment_id: req.params.id })
            .populate('student_id', 'name email');
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { submitAssignment, getSubmissions };
