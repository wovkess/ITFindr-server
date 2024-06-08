const { Schema, model } = require('mongoose');

const TechnologySchema = new Schema({
    name: { type: String, unique: true, required: true },
});

module.exports = model('Technology', TechnologySchema);