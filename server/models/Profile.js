const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    bio: { type: String },
    year: { type: Number },
    course: { type: String },
    phone: { type: String },
});

module.exports = mongoose.model('Profile', profileSchema);
