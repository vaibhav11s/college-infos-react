import http from "../http-common";

const getAll = ({
  skip = null,
  page = null,
  collegesPerPage: per = null,
  courses = null,
  state = null,
  city = null,
} = {}) => {
  let uri = `colleges?`;

  if (typeof skip === "number" || typeof skip === "string")
    uri += `skip=${skip}&`;
  else if (typeof page === "number" || typeof page === "string")
    uri += `page=${+page - 1}&`;

  if (typeof per === "number" || typeof per === "string")
    uri += `collegesPerPage=${per}&`;

  if (courses && Array.isArray(courses)) uri += `courses=${courses.join(",")}&`;
  else if (typeof courses === "string") uri += `courses=${courses}&`;

  if (typeof city === "string") uri += `city=${city}&`;
  else if (typeof state === "string") uri += `state=${state}&`;

  return http.get(uri);
};

/* get stats of all colleges */
const getAllStats = () => {
  return http.get("colleges/stats");
};

/* find by id */
const get = ({ id, withStudents = false, withSimilar = false }) => {
  let uri = `colleges/${id}`;
  if (withSimilar || withStudents) {
    uri += "?";
    if (withSimilar === true) uri += "similar=true&";
    if (withStudents === true) uri += "students=true";
  }
  return http.get(uri);
};

/* get all courses */
const getCourses = () => {
  return http.get("colleges/courses");
};

/* get all states */
const getStates = () => {
  return http.get("colleges/states");
};

/* get all cities */
const getCities = ({ state = null } = {}) => {
  let uri = "colleges/cities";
  if (typeof state === "string") uri += `?state=${state}`;
  return http.get(uri);
};

const collegeService = {
  getAll,
  getAllStats,
  get,
  getCities,
  getCourses,
  getStates,
};
export default collegeService;
export { getAll, getAllStats, get, getCities, getCourses, getStates };
