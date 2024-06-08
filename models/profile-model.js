const {Schema, model} = require('mongoose');
const User = require('./user-model')

const ProfileSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    about: {type: String, required: true},
    experience: {type: String, required: true},
    country: {type: String, required: true},
    birthDate: {type: Date},
    salary: { type: Number, required: true},
    phoneNumber: { type: Number, required: true },
    telegramUrl: {type: String},
    githubUrl: { type: String },
    LinkedInUrl: {type: String},
    specialization: {type: String, required: true},
    technologies: [{ type: Schema.Types.ObjectId, ref: 'Technology' }],
    photo: { type: String },
}); 

module.exports = model('Profile', ProfileSchema);