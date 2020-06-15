const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    name: String,
    description: String,
    posted_by: String,
    votes: [String]
});

module.exports = mongoose.model('Topic', TopicSchema);