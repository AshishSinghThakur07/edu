const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobposting_id: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting', required: true },
    candidate_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'APPLIED' },
    resume_url: { type: String },
    applied_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', applicationSchema);
