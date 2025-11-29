const JobPosting = require('../models/JobPosting');

// @desc    Get all job postings
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
    try {
        const jobs = await JobPosting.find().populate('institution_id', 'name');
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a job posting
// @route   POST /api/jobs
// @access  Private (Admin/HR)
const createJob = async (req, res) => {
    try {
        const { institution_id, title, description, closing_at } = req.body;

        const job = await JobPosting.create({
            institution_id,
            title,
            description,
            closing_at
        });

        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getJobs, createJob };
