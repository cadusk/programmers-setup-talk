import {
  React,
  TopicList,
  Redirect,
  ToastyUtil,
  TopicRepo,
  Button,
  Formik,
  Form,
  Grid,
  TextField
} from "./index";

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
        console.log("te", res);
      },
      () => {
        ToastyUtil.errorNotify("Erro ao consultar tópicos.");
      }
    );
  }

  gotToTopicForm() {
    this.setState({ redirect: "/topics/" });
  }

  search(value) { }
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
          <Button
            color="primary"
            variant="contained"
            label="Sugerir tópico"
            onClick={this.gotToTopicForm}
            type="button"
          />
        </div>
        <Grid container>
          <Formik
            initialValues={{ topic: "" }}
            onSubmit={(this.values, this.search)}
          >
            <Form>
              <Grid container direction="row" spacing={3}>
                <div style={{ marginLeft: "3.7vw" }}>
                  <Grid item>
                    <TextField
                      label="Tópico"
                      variant="outlined"
                      width="20vw"
                      name="topic"
                    />
                  </Grid>
                  <br></br>
                  <Grid item>
                    <Button
                      color="primary"
                      variant="contained"
                      label="Pesquisar"
                      type="submit"
                    />
                  </Grid>
                </div>
              </Grid>
            </Form>
          </Formik>
        </Grid>
        <br></br>

        <div style={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            {this.state.topics.map((topic) => (
              <Grid key={`Grid-${topic._id}`} item xs={4}>
                <TopicList
                  key={`${topic._id}`}
                  onTopicList={this.updateTopics}
                  id={topic._id}
                  name={topic.name}
                  description={topic.description}
                  votes={topic.__v}
                  topics={this.state.topics}
                  postedBy={topic.posted_by}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}
