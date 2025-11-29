const Application = require('../models/Application');

// @desc    Apply for a job
// @route   POST /api/jobs/apply
// @access  Private
const applyForJob = async (req, res) => {
    try {
        const { jobposting_id, candidate_id, resume_url } = req.body;

        // Check if already applied
        const existing = await Application.findOne({ jobposting_id, candidate_id });
        if (existing) {
            return res.status(400).json({ message: 'Already applied for this job' });
        }

        const application = await Application.create({
            jobposting_id,
            candidate_id,
            resume_url
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get applications for a job
// @route   GET /api/jobs/:id/applications
// @access  Private (Admin/HR)
const getApplications = async (req, res) => {
    try {
        const applications = await Application.find({ jobposting_id: req.params.id })
            .populate('candidate_id', 'name email');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { applyForJob, getApplications };
