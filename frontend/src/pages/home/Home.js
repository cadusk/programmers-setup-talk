import { React, TopicList, Redirect, ToastyUtil, TopicRepo, Button } from "./index";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      redirect: null,
    };
    this.getTopics = this.getTopics.bind(this);
    this.updateTopics = this.updateTopics.bind(this);
    this.gotToTopicForm = this.gotToTopicForm.bind(this);
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

  gotToTopicForm() {
    this.setState({ redirect: "/topics/" });
  }

  updateTopics(topics) {
    this.setState({ topics: topics });
  }

  render() {
    
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div>
        <div className="pos-right">
          <Button label="Sugerir tópico" onClick={this.gotToTopicForm} type="button" />
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
