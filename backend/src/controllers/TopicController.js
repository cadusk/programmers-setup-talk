const Topic = require('../models/Topic');

module.exports = {
    async index(request, response) {
        const topics = await Topic.find();
        return response.json({ topics: topics });
    },

    store (request, response) {
        const { user } = request.headers;
        const { name, description } = request.query;
        if(!name || !description) {
            return response.status(400).json({message: 'Parameters are not correct'})
        }

        Topic.create({
            name: name,
            description: description,
            posted_by: user
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
        const { user } = request.headers
        const { id } = request.params;

        if(!user || !id) {
            return response.status(400).json({message: 'Parameters are not correct'})
        }
        const topic = await Topic.findById( { _id: id} );

        if(topic){
            if(!topic.votes.includes(user)){
                topic.votes.push(user);
                await topic.save();
                return response.json(topic);
            } else {
                return response.status(409).json({error: "This user has already voted for this topic"})
            }

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