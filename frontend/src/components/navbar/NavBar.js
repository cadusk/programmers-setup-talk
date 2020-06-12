import {
  React,
  Link,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  JWTUtil,
  Grid,
} from "./index";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = JWTUtil.getUser();
  }
  render() {
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
            <div></div>
            <Grid
              container
              alignItems="flex-start"
              justify="flex-end"
              direction="row"
              style={{ margin: "0 1vw" }}
            >
              <Typography align="right">{this.state.email}</Typography>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
