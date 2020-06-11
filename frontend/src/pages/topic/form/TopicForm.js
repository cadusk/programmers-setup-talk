import { 
  React, Redirect, ToastyUtil, TopicRepo, Yup, Form, Formik,TextField, Button, QueryString
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
      <Formik
        initialValues={this.getFormInitialValues()}
        validationSchema={this.getValidationSchema()}
        onSubmit={(this.values, this.handleSubmit)}
      >
        {() => (
          <Form>
            <div>
              <div className="form-grid">
                <TextField  name="name" label="Tópico" />
                <TextField name="description" label="Descrição" />
              </div>
            </div>
            <br></br>
            <div className="display-buttons">
              <Button onClick={this.goToHome} label="Voltar" type="button"/>
              <Button label="Salvar" type="submit"/>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}
