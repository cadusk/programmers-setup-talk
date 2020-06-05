import React from 'react';
import './TopicList.css'
import { Link } from 'react-router-dom';
import { TopicRepo } from '../../repo/topicRepository';
import { ToastyUtil } from '../../utils/toast';

export default class TopicList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      votes: this.props.votes,
    }
    this.incrementVote = this.incrementVote.bind(this);
  }

  incrementVote(id){
    TopicRepo.addVote(id).then(
      res => {
      },error => {
        ToastyUtil.errorNotify('Erro ao realizar voto.')
      }
    );
  }

  delete(id){
    TopicRepo.remove(id)
    .then(
      res => {
        ToastyUtil.successNotify('Exclusão realizada!')
      },error => {
        ToastyUtil.errorNotify('Erro ao realizar exclusão.')
      }
    );
  }

  render(){
  return (
    <div>
      <ul>
          <li>
            <div className="list-div card">
              <Link className="card-margin-left" to={`/topics/${this.props.id}`}>
                <h2>{this.props.name}</h2> 
              </Link>
              <p className="card-margin-left" >{this.props.description}</p>
              <div className="vote">
                <button className="vote-count btn-vote" onClick={() => this.incrementVote(this.props.id)}>
                   <i className="material-icons">thumb_up</i>
                </button>
                <p className="vote-count">{this.state.votes}</p>
                <button className="vote-count btn-vote" onClick={() => this.delete(this.props.id)}>
                   <i className="material-icons">delete</i>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
