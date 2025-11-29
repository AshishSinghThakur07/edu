const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    address: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Institution', institutionSchema);
