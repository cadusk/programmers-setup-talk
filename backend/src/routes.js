const { Router }  = require('express');
const TopicController = require('./controllers/TopicController');


const routes = Router();

routes.get('/topics', TopicController.index)
routes.post('/topics', TopicController.store);
routes.delete('/topic', TopicController.destroy);
routes.put('/topic', TopicController.updateTopic);
routes.put('/topic/voteup', TopicController.update);

module.exports = routes;