const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { APP_URL } = require('../config')

const YourHRuserSchema = new Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, get: (image)=>{
        const imageUrl = image.replace(/\\/g, '/');
        return `${APP_URL}/${imageUrl}`;
    }},
    
}, { timestamps: true, toJSON: { getters: true}, toObject: { getters: true } });

module.exports = mongoose.model('YourHRuser', YourHRuserSchema, 'YourHRusers');