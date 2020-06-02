import React from 'react';
import './TopicList.css'

export default class TopicList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      votes: this.props.votes,
    }
    this.incrementVote = this.incrementVote.bind(this);
  }

  incrementVote(){
    this.setState({votes: (this.state.votes + 1)});
  }

  render(){
  return (
    <div>
      <ul>
          <li>
            <div className="list-div card">
              <h2 className="card-margin-left" >{this.props.theme}</h2> 
              <p className="card-margin-left" >{this.props.description}</p>
              <div className="vote">
                <p className="vote-name vote-margin-left">{this.props.name}</p>
                <button className="vote-count btn-vote" onClick={this.incrementVote}>
                   <i className="material-icons">thumb_up</i>
                </button>
                <p className="vote-count">{this.state.votes}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
