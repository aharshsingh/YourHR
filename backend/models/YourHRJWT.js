const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const yourHRjwtSchema = new Schema({
    token: { type: String, unique: true }
}, { timestamps: false });

module.exports = mongoose.model('yourHRjwt', yourHRjwtSchema, 'yourHRjwts');
