import { React, TopicList, Link, ToastyUtil, TopicRepo } from "./index";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
    };
    this.getTopics = this.getTopics.bind(this);
    this.updateTopics = this.updateTopics.bind(this);
  }

  componentDidMount() {
    this.getTopics();
  }

  getTopics() {
    TopicRepo.get().then(
      (res) => {
        this.setState({ topics: res.data.topics });
      },
      (error) => {
        ToastyUtil.errorNotify("Erro ao consultar tópicos.");
      }
    );
  }

  updateTopics(topics) {
    this.setState({ topics: topics });
  }

  render() {
    return (
      <div>
        <div className="pos-right">
          <Link className="btn btn-link" to="/topics/">
            {" "}
            Sugerir tópico{" "}
          </Link>
        </div>
        {this.state.topics.map((topic) => (
          <TopicList
            key={`${topic._id}`}
            onTopicList={this.updateTopics}
            id={topic._id}
            name={topic.name}
            description={topic.description}
            votes={topic.votes}
            topics={this.state.topics}
          />
        ))}
      </div>
    );
  }
}
