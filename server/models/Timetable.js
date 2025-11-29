const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    day: { type: String, required: true },
    start_time: { type: String, required: true }, // Storing as string HH:MM for simplicity or could use Date
    end_time: { type: String, required: true },
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Timetable', timetableSchema);
