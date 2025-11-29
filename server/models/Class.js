const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Many-to-many handled via array
});

module.exports = mongoose.model('Class', classSchema);
