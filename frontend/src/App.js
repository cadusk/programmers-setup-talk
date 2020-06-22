import React from 'react';
import './App.css';
import Home from './pages/home/Home'
import TopicForm from './pages/topic/form/TopicForm';
import NavBar from './components/navbar/NavBar';
import {BrowserRouter as Router, Switch, Route, Redirect, } from 'react-router-dom';
import Login from './pages/login/Login';
require('dotenv').config()

export default function App() {
  return (
    <div className="App">
      <Router>
       <Switch>
        <Route path="/login" exact component={Login}/>
        <Route >
            <Route component={NavBar} path="/" />
            <Route component={Home} exact path="/" />
            <Route component={TopicForm} exact path="/topics" />
            <Route component={TopicForm} exact path="/topics/:id"/> 
            <Redirect from="*" to="/"/>
        </Route>
      </Switch>  
        </Router>
    </div>
  );
}
