const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['STUDENT', 'TEACHER', 'HR', 'ADMIN'],
        required: true
    },
    name: { type: String, required: true },
    institution_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('User', userSchema);
