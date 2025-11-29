const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    title: { type: String, required: true },
    description: { type: String },
    due_date: { type: Date },
});

module.exports = mongoose.model('Assignment', assignmentSchema);
