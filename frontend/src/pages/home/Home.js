import React, { useState, useEffect } from 'react';
import './Home.css'
import ThemeList from '../../components/ThemeList/ThemeList';
import { Link } from 'react-router-dom';


function Home () {
  const [topics, setTopics] = useState({themes: []});

  useEffect(() => {
    fetchTopics();
}, []);

  const fetchTopics = async() => {
    const fetchTopics = await fetch('http://localhost:5000/themes');
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
      {topics.themes.map(theme => (
          <ThemeList key={`${theme.theme}-${theme.name}`} theme={theme.theme} description={theme.description} name={theme.name} votes={theme.votes} />
      ))}
    </div>
  );
}

export default Home;
