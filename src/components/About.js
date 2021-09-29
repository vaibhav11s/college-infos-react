import { Grid, Paper, Typography } from "@mui/material";

const About = () => {
  const paperStyle = {
    padding: 20,
    minHeight: "150px",
    margin: "40px auto",

    background: "rgb(247 247 247 / 83%)",
  };
  return (
    <Grid
      container
      padding="10px"
      justifyContent="space-around"
      direction="row"
    >
      <Paper elevation={10} style={paperStyle}>
        <Typography variant="h4" textAlign="center">
          About
        </Typography>
        <Typography textAlign="center">
          This is a React web app. This app shows the information of different
          colleges and students
        </Typography>
        <Typography textAlign="center">
          Made with MERN stack, By Vaibhav.
        </Typography>
      </Paper>
    </Grid>
  );
};

export default About;
