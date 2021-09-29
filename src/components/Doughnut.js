import { Grid, Paper, useMediaQuery } from "@mui/material";
import { Doughnut } from "react-chartjs-2";

const DougunutX = ({ onClick, name, data }) => {
  const paperStyle = {
    backgroundColor: "rgb(255 255 255 / 64%)",
    margin: "6px",
  };
  const showLegend = useMediaQuery("(min-width:600px)");
  return (
    <Grid item xs={10} sm={9} md={6} lg={4}>
      <Paper elevation={10} style={paperStyle}>
        <Doughnut
          data={data}
          options={{
            onClick: (_, a) => onClick(name, a),
            plugins: {
              title: { text: name, display: true, font: { size: 20 } },
              legend: {
                display: showLegend,
                position: "right",
                maxHeight: 20,
                maxWidth: 200,
              },
            },
          }}
        />
      </Paper>
    </Grid>
  );
};

export default DougunutX;
