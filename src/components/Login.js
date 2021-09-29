import { Button, TextField, Grid, Paper, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

const Login = ({ login: lg }) => {
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    const name = document.getElementById("name")["value"];
    if (!name) return;
    lg(name);
    history.replace("/colleges");
  };
  const paperStyle = {
    padding: 20,
    height: "150px",
    margin: "40px auto",
    background: "rgb(247 247 247 / 83%)",
  };
  return (
    <Grid container justifyContent="space-around" direction="row">
      <Paper elevation={10} style={paperStyle}>
        <Typography textAlign="center">Login</Typography>
        <form>
          <TextField
            label="Name"
            id="name"
            placeholder="Username"
            required
            variant="standard"
            fullWidth
          />
          <Button
            type="submit"
            style={{ marginTop: "20px" }}
            variant="contained"
            fullWidth
            onClick={login}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
