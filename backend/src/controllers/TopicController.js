const Topic = require('../models/Topic');
const  mongoose = require('mongoose');

module.exports = {
    async index(request, response) {
        const topics = await Topic.find();
        return response.json({ topics: topics });
    },

    async store (request, response) {
        const { name, description } = request.query;
    
        const topic = await Topic.create({
            name: name,
            description: description,
            votes: 0
        });
        return response.json({topic});
    },

    async destroy(request, response) {
        const { id } = request.query;
        const topic = await Topic.findByIdAndRemove( { _id: id} );
        
        return response.json(topic);
    },

    async update(request, response) {
        const { id } = request.query;
        const topic = await Topic.findById( { _id: id} );
        const { votes } = topic;

        const updatedVote = await Topic.findOneAndUpdate({_id: id}, {votes: votes+1}, {new: true});
        return response.json(updatedVote);
    },

    async updateTopic(request, response ){
        const { id } = request.query;
        const { name, description } = request.body;
        const topic = await Topic.findById( { _id: id} );

        const updatedTopic = await Topic.findOneAndUpdate({_id: id}, 
            {
                name: name,
                description: description
            },
            {new: true});

        return response.json(updatedTopic)
    }
}