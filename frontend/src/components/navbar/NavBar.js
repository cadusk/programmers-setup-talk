import {
  React,
  Link,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  JWTUtil,
  Grid,
  Button,
  Redirect
} from "./index";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JWTUtil.getUser(),
      redirect: null,
    };

    this.logout = this.logout.bind(this);
  }

  logout() {
    JWTUtil.removeUser();
    this.setState({ redirect: "/login" });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Link to="/">
                <img
                  className="logo"
                  src="https://admin.programmers.com.br/Content/images/logo-topo.png"
                  alt=""
                />
              </Link>
            </IconButton>

            <Grid
              container
              alignItems="flex-start"
              justify="flex-end"
              direction="row"
              style={{ margin: "0 1vw" }}
            >
              <Grid item className="margin-top">
                <Typography >{this.state.user.email}</Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={this.logout}
                  className="button-nav"
                  label="Logout"
                />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
