import React, { useState, useEffect } from 'react';
import './Home.css'
import TopicList from '../../components/TopicList/TopicList';
import { Link } from 'react-router-dom';


export default function Home () {
  const [topics, setTopics] = useState({topics: []});

  useEffect(() => {
    fetchTopics();
}, []);

  const fetchTopics = async() => {
    const fetchTopics = await fetch('http://localhost:5000/topics');
    const topicsJson = await fetchTopics.json();
    setTopics(topicsJson);
  }

  return (
    <div>
      <div className="pos-right">
      <button className='btn btn-link'>
      <Link to="/topics/" >Sugerir tema</Link>
        </button>
      </div>
      {topics.topics.map(topic => (
          <TopicList key={`${topic.theme}-${topic.name}`} theme={topic.theme} description={topic.description} name={topic.name} votes={topic.votes} />
      ))}
    </div>
  );
}
