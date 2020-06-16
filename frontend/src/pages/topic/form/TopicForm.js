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
  Textarea,
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

  async putForm(data) {
    const response = await TopicRepo.edit(data);

    if(!response.hasError) {
      ToastyUtil.successNotify("Sugestão editada!");
      this.goToHome();
    } else {
      ToastyUtil.errorNotify(response.data);
    }
  }

  async postForm(data) {

    const response = await TopicRepo.add(data);

    if(!response.hasError) {
      ToastyUtil.successNotify("Sugestão salva!");
      this.goToHome();
    } else {
      ToastyUtil.errorNotify(response.data);
    }
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
                      <TextField name="name" width="30vw" label="Tópico" />
                    </Grid>
                    <br></br>
                    <Grid item xs={12}>
                    <Textarea name="description" width="30vw" label="Descrição"></Textarea>
                    </Grid>
                    <br></br>
                    <div className="display-buttons"></div>
                  </CardContent>
                  <CardActions>
                    
                    <Button
                      onClick={this.goToHome}
                      label="Cancelar"
                      type="button"
                    />
                    <Grid
                         item
                         container
                         alignItems="flex-start"
                         justify="flex-end"
                         direction="row"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        label="Salvar"
                        type="submit"
                      />
                    </Grid>
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
