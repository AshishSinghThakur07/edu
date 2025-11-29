const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    institution_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
    description: { type: String },
});

module.exports = mongoose.model('Course', courseSchema);
