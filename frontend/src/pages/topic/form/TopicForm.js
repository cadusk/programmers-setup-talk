import {
  React,
  Redirect,
  ToastyUtil,
  TopicRepo,
  Yup,
  Form,
  Formik,
  TextField,
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  QueryString,
} from "./index";

export default class TopicForm extends React.Component {
  constructor(props) {
    super(props);
    let query = QueryString.parse(this.props.location.search);
    this.state = {
      user: {
        name: "",
        email: "",
      },
      id: props.match.params.id,
      topic: {
        name: query.name ? query.name : "",
        description: query.description ? query.description : "",
      },
      redirect: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.goToHome = this.goToHome.bind(this);
  }

  handleSubmit(values) {
    let topic = values;
    if (this.state.id) {
      topic.id = this.state.id;
      this.putForm(topic);
    } else {
      this.postForm(topic);
    }
  }

  putForm(data) {
    TopicRepo.edit(data).then(
      () => {
        ToastyUtil.successNotify("Sugestão editada!");
        this.goToHome();
      },
      () => {
        ToastyUtil.errorNotify("Erro ao editar sugestão.");
      }
    );
  }

  postForm(data) {
    TopicRepo.add(data).then(
      () => {
        ToastyUtil.successNotify("Sugestão salva!");
        this.goToHome();
      },
      () => {
        ToastyUtil.errorNotify("Erro ao salvar sugestão.");
      }
    );
  }

  getValidationSchema() {
    return Yup.object({
      name: Yup.string()
        .min(1, "Pelo menos 1 caracter")
        .max(20, "Máximo de 20 caracteres")
        .required("Tópico é obrigatório"),

      description: Yup.string()
        .min(1, "Pelo menos 1 caracter")
        .max(255, "Máximo de 255 caracteres")
        .required("Descrição é obrigatória"),
    });
  }

  getFormInitialValues() {
    return {
      name: this.state.topic.name,
      description: this.state.topic.description,
    };
  }

  goToHome() {
    this.setState({ redirect: "/" });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item xs={12}>
          <Formik
            initialValues={this.getFormInitialValues()}
            validationSchema={this.getValidationSchema()}
            onSubmit={(this.values, this.handleSubmit)}
          >
            {() => (
              <Form>
                <Card>
                  <Grid container>
                    <Typography
                      style={{ padding: 16 }}
                      display="block"
                      variant="h6"
                      gutterBottom
                    >
                      {this.state.id ? "Editar" : "Novo"} tópico
                    </Typography>
                  </Grid>
                  <CardContent>
                    <Grid item xs={12}>
                      <TextField name="name" width="20vw" label="Tópico" />
                    </Grid>
                    <br></br>
                    <Grid item xs={12}>
                      <TextField
                        name="description"
                        width="30vw"
                        label="Descrição"
                      />
                    </Grid>
                    <br></br>
                    <div className="display-buttons"></div>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={this.goToHome}
                      label="Voltar"
                      type="button"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      label="Salvar"
                      type="submit"
                    />
                  </CardActions>
                </Card>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    );
  }
}
