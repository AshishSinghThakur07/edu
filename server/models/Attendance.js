const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    date: { type: Date, required: true },
    present: { type: Boolean, required: true, default: false },
});

// Compound index for unique attendance record per user per class per date
attendanceSchema.index({ user_id: 1, class_id: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
