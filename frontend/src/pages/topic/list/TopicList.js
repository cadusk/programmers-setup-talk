import {
  React,
  TopicRepo,
  ToastyUtil,
  ThumbUpIcon,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Button,
  Grid,
  Redirect,
} from "./index";

export default class TopicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      votes: this.props.votes,
      topics: this.props.topics,
      postedBy: this.props.postedBy,
      redirect: null,
    };
    this.incrementVote = this.incrementVote.bind(this);
    this.gotToEditTopic = this.gotToEditTopic.bind(this);
  }

  incrementVote(id) {
    TopicRepo.addVote(id).then(
      (res) => {
        this.setState({ votes: res.data.__v });
      },
      (error) => {
        console.log("error", error);
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
      () => {
        ToastyUtil.successNotify("Exclusão realizada!");
        this.removeTopicFromState(id);
      },
      () => {
        ToastyUtil.errorNotify("Erro ao realizar exclusão.");
      }
    );
  }

  gotToEditTopic() {
    this.setState({
      redirect: `/topics/${this.props.id}?name=${this.props.name}&description=${this.props.description}`,
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div>
        <ul>
          <li>
            <Card style={{ width: "25vw" }}>
              <CardActionArea onClick={this.gotToEditTopic}>
                <CardContent>
                  <Typography gutterBottom variant="h5" align="left">
                    {this.props.name}
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    {this.props.description}
                  </Typography>
                  <br></br>
                  <Grid
                    container
                    alignItems="flex-start"
                    justify="flex-end"
                    direction="row"
                  >
                    <div style={{ display: "flex", flex: "auto" }}>
                      <Typography
                        align="left"
                        variant="h5"
                        color="textSecondary"
                      >
                        {this.state.postedBy}
                      </Typography>
                    </div>
                    <div style={{ display: "flex" }}>
                      <ThumbUpIcon color="primary" />
                      <Typography style={{ margin: "0 1vw" }}>
                        {this.state.votes}
                      </Typography>
                    </div>
                  </Grid>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid
                  container
                  alignItems="flex-start"
                  justify="flex-start"
                  direction="row"
                >
                  <Button
                    color="primary"
                    onClick={() => this.incrementVote(this.props.id)}
                    label="Votar"
                    type="submit"
                  />
                  <Button
                    color="secondary"
                    onClick={() => this.delete(this.props.id)}
                    label="Excluir"
                    type="submit"
                  />
                </Grid>
              </CardActions>
            </Card>
          </li>
        </ul>
      </div>
    );
  }
}
