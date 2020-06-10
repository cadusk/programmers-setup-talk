import { React, Link, ToastyUtil, TopicRepo, ButtonIcon } from "./index";

export default class TopicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      votes: this.props.votes,
      topics: this.props.topics,
    };
    this.incrementVote = this.incrementVote.bind(this);
  }

  incrementVote(id) {
    TopicRepo.addVote(id).then(
      (res) => {
        this.setState({ votes: this.state.votes + 1 });
      },
      (error) => {
        ToastyUtil.errorNotify("Erro ao realizar voto.");
      }
    );
  }

  updateTopicList() {
    let topic = this.state.topics;
    this.props.onTopicList(topic);
  }

  removeTopicFromState(id) {
    let topics = this.state.topics;
    let index = topics.findIndex((x) => x._id === id);

    topics.splice(index, 1);

    this.setState({ topics: topics });

    this.updateTopicList();
  }

  delete(id) {
    TopicRepo.remove(id).then(
      (res) => {
        ToastyUtil.successNotify("Exclusão realizada!");
        this.removeTopicFromState(id);
      },
      (error) => {
        ToastyUtil.errorNotify("Erro ao realizar exclusão.");
      }
    );
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <div className="card card-shadow">
              <Link
                className="card-text"
                to={`/topics/${this.props.id}?name=${this.props.name}&description=${this.props.description}`}
              >
                <h2>{this.props.name}</h2>
              </Link>
              <p className="card-text">{this.props.description}</p>
              <div className="aling-icon">
                <ButtonIcon className="icon-position " onClick={() => this.incrementVote(this.props.id)} color="#5DC347"iconName="thumb_up"/>

                <p className="vote-counter icon-position">{this.state.votes}</p>
                <ButtonIcon className="icon-position" onClick={() => this.delete(this.props.id)} color="#FF0000" iconName="delete"/>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
