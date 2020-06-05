import React, { useState, useEffect } from 'react';
import './Home.css'
import TopicList from '../../components/TopicList/TopicList';
import { Link } from 'react-router-dom';
import { TopicRepo } from '../../repo/topicRepository';
import { ToastyUtil } from '../../utils/toast';


export default function Home () {
  const [topics, setTopics] = useState({topics: []});

  useEffect(() => {
    fetchTopics();
}, []);

  const fetchTopics = async() => {
    TopicRepo.get()
      .then(
          res => {
            setTopics({topics: res.data});
          }, error => {
            ToastyUtil.errorNotify('Erro ao consultar tópicos.');
          }
      );
  }

  return (
    <div>
      <div className="pos-right">
      <button className='btn btn-link'>
      <Link to="/topics/" >Sugerir tema</Link>
        </button>
      </div>
      {topics.topics.map(topic => (
          <TopicList key={`${topic._id}`}
           id={topic._id} name={topic.name} description={topic.description} votes={topic.votes} />
      ))}
    </div>
  );
}
