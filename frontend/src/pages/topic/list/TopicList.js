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

  async incrementVote(id) {
    const response = await TopicRepo.addVote(id);
    if(!response.hasError) {
      this.setState({ votes: response.data.__v });
    }else {
      ToastyUtil.errorNotify(response.data);
    }
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

  async delete(id) {
    const response = await TopicRepo.remove(id);
     if (!response.hasError) {
       this.removeTopicFromState(id);
     } else {
       ToastyUtil.errorNotify(response.data)
     }
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
            <Card >
              <CardActionArea onClick={this.gotToEditTopic}>
                <CardContent>
                  <Typography  gutterBottom variant="h5" align="left">
                    Título: {this.props.name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Descrição: {this.props.description}
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
                        variant="h6"
                        color="textSecondary"
                      >
                       Sugerido por: {this.state.postedBy}
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
