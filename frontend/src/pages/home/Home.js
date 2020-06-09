import React from 'react';
import './Home.css'
import TopicList from '../../pages//topic/list/TopicList';
import { Link } from 'react-router-dom';
import { TopicRepo } from '../../repo/topicRepository';
import { ToastyUtil } from '../../utils/toast';


export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topics: []
    }
    this.getTopics = this.getTopics.bind(this);
    this.updateTopics = this.updateTopics.bind(this);

  }

  componentDidMount() {
    this.getTopics();
  }

   getTopics() {
    TopicRepo.get()
      .then(
          res => {
            this.setState({topics: res.data.topics})
          }, error => {
            ToastyUtil.errorNotify('Erro ao consultar tópicos.');
          }
      );
  }

  updateTopics(topics)  {
    this.setState({topics: topics})
}

  render() {
    return(
    <div>
      <div className="pos-right">
      <button className='btn btn-link'>
      <Link to="/topics/" >Sugerir tema</Link>
        </button>
      </div>
        {this.state.topics.map(topic => (
          <TopicList key={`${topic._id}`} onTopicList = {this.updateTopics}
           id={topic._id} name={topic.name} description={topic.description} votes={topic.votes} topics={this.state.topics}/>
        ))}
      </div>
    );
  }
}