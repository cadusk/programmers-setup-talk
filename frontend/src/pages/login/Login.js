import {
  React,
  TextField,
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Redirect,
  Yup,
  Form,
  Formik,
  JWTUtil,
} from "./index";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
    };
    this.login = this.login.bind(this);
  }

  login(values) {
    JWTUtil.setUser(values);
    this.setState({ redirect: "/" });
  }

  getFormInitialValues() {
    return {
      email: "",
    };
  }

  getValidationSchema() {
    return Yup.object({
      email: Yup.string().required("E-mail é obrigatório"),
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Grid
        className="body"
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item xs={12}>
          <Formik
            initialValues={this.getFormInitialValues()}
            validationSchema={this.getValidationSchema()}
            onSubmit={(this.values, this.login)}
          >
            {() => (
              <Form>
                <Card>
                  <CardContent>
                    <img
                      src="https://secure.aadcdn.microsoftonline-p.com/dbd5a2dd-kev9eqrloums3qb-t4el40pkjbk7ajoboqi-wlxjtpk/logintenantbranding/0/bannerlogo?ts=637231567370079556"
                      alt="logo"
                      style={{ height: 40 }}
                    />
                    <br></br>
                    <br></br>
                    <Typography variant="h6" gutterBottom>
                      Login
                    </Typography>
                    <br></br>
                    <TextField name="email" label="E-mail" width="25vw" />
                  </CardContent>
                  <CardActions>
                    <Grid
                      container
                      alignItems="flex-start"
                      justify="flex-end"
                      direction="row"
                    >
                      <div className="button-margin">
                        <Button
                          size="large"
                          variant="contained"
                          color="primary"
                          label="Entrar"
                          type="submit"
                        />
                      </div>
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
