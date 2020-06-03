const Topic = require('../models/Topic');

module.exports = {
    async index(request, response) {
        const topics = await Topic.find();
        return response.json(topics);
    },

    async store (request, response) {
        const { name, description } = request.query;
    
        const topic = await Topic.create({
            name: name,
            description: description,
            votes: 0
        });
        return response.json({topic});
    }
}