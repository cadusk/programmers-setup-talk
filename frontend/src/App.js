import React from 'react';
import './App.css';
import Home from './pages/home/Home'
import TopicForm from './pages/topic/form/TopicForm';
import NavBar from './components/navbar/NavBar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
require('dotenv').config()

export default function App() {
  return (
    <div className="App">
      <Router>
       <NavBar />
       <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/topics" exact component={TopicForm}/>
        <Route path="/topics/:id"  component={TopicForm}/>
      </Switch>  
        </Router>
    </div>
  );
}
