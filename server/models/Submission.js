const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    assignment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    file_url: { type: String },
    submitted_at: { type: Date, default: Date.now },
    grade: { type: Number },
    feedback: { type: String },
});

submissionSchema.index({ assignment_id: 1, student_id: 1 }, { unique: true });

module.exports = mongoose.model('Submission', submissionSchema);
