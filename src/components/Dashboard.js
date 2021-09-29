import { useEffect, useState } from "react";
import collegeService from "../services/college";
import Doughnut from "./Doughnut";
import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";

const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Dashboard = () => {
  const history = useHistory();
  const [stateData, setStateData] = useState(null);
  const [citiesData, setCitiesData] = useState(null);
  const [coursesData, setCoursesData] = useState(null);

  const makeData = (mainData, label) => {
    mainData.splice(7, 30);
    let labels = mainData.map((dt) => dt._id);
    let datasets = {};
    datasets["label"] = label;
    datasets["data"] = mainData.map((dt) => dt.total);
    datasets["radius"] = "70%";
    datasets["backgroundColor"] = mainData.map(() => getRandomColor());
    return { labels, datasets: [datasets] };
  };

  useEffect(() => {
    collegeService
      .getAllStats()
      .then((res) => res.data)
      .then((data) => {
        setStateData(makeData(data.states, "State"));
        setCitiesData(makeData(data.cities, "Cities"));
        setCoursesData(makeData(data.courses, "Courses"));
      });
  }, []);

  const onClick = (name, a) => {
    let query;
    if (name === "City stats") {
      query = citiesData.labels?.[a?.[0]?.index];
      name = "city";
    }
    if (name === "State stats") {
      query = stateData.labels?.[a?.[0]?.index];
      name = "state";
    }
    if (name === "Courses stats") {
      query = coursesData.labels?.[a?.[0]?.index];
      name = "courses";
    }
    if (query) history.push(`/colleges?${name}=${query}`);
  };

  return (
    <div>
      <Grid container justifyContent="space-around">
        {stateData && (
          <Doughnut data={stateData} onClick={onClick} name="State stats" />
        )}
        {citiesData && (
          <Doughnut data={citiesData} onClick={onClick} name="City stats" />
        )}
        {coursesData && (
          <Doughnut data={coursesData} onClick={onClick} name="Courses stats" />
        )}
      </Grid>
    </div>
  );
};

export default Dashboard;
