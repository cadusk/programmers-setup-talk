const Topic = require('../models/Topic');
const  mongoose = require('mongoose');

module.exports = {
    async index(request, response) {
        const topics = await Topic.find();
        return response.json({ topics: topics });
    },

    store (request, response) {
        const { name, description } = request.query;
        if(!name || !description) {
            return response.status(400).json({message: 'Parameters name are not correct'})
        }

        Topic.create({
            name: name,
            description: description,
            votes: 0
        }).then(newTopic => {
            return response.json(newTopic);
        }).catch(err => {
            return response.status(500).json({message: err})
        });
    },

    async destroy(request, response) {
        const { id } = request.params;
        const topic = await Topic.findByIdAndRemove( { _id: id} )
        if (topic) {
            return response.json(topic);
        } else {
            return response.status(404).json({message: 'This id does not exist'})
        }
    },

    async voteUp(request, response) {
        const { id } = request.params;
        const topic = await Topic.findById( { _id: id} );

        if(topic){
            const { votes } = topic;
            Topic.findOneAndUpdate({_id: id}, {votes: votes+1}, {new: true}).then(res => {
                return response.json(res);
            }).catch((error) => {
                response.status(500).json({ message: error.message});
                });
        } else {
            response.status(404).json({message: 'This id does not exist'});
        }
    },

    async updateTopic(request, response ){
        const { id } = request.params;
        const { name, description } = request.body;

        if(!name || !description) {
            return response.status(400).json({message: 'Parameters name are not correct'})
        }

        const topic = await Topic.findById( { _id: id} );
        if(topic){

        Topic.findOneAndUpdate({_id: id}, 
            {
                name: name,
                description: description
            },
            {new: true, })
            .then(res => {
                return response.json(res);
            })
            .catch(err => {
                return response.json({message: err})
            });            
        } else {
            response.status(404).json({message: 'This id does not exist'})
        }
    }
}