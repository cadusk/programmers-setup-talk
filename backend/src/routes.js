const { Router }  = require('express');
const TopicController = require('./controllers/TopicController');


const routes = Router();

routes.get('/topics', TopicController.index)                // Returns a list of all topics in the DB
routes.post('/topic', TopicController.store);               // Creates a new topic in the DB
routes.delete('/topic/:id', TopicController.destroy);       // Deletes an existing topic based on its _id
routes.patch('/topic/:id', TopicController.updateTopic);    // Changes the name and description of a topic based on its _id
routes.post('/topic/:id/voteup', TopicController.voteUp);       // Gives a vote up to a specific topic based on its _id

module.exports = routes;