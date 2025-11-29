const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
    institution_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
    title: { type: String, required: true },
    description: { type: String },
    posted_at: { type: Date, default: Date.now },
    closing_at: { type: Date },
});

module.exports = mongoose.model('JobPosting', jobPostingSchema);
