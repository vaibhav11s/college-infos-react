import http from "../http-common";

const getAll = ({
  skip = 0,
  page = null,
  studentsPerPage: per = null,
  skills = null,
  enrolledCourse = null,
  state = null,
  city = null,
  collegeId = null,
} = {}) => {
  let uri = `students?`;
  if (typeof skip === "number" || typeof skip === "string")
    uri += `skip=${skip}&`;
  else if (typeof page === "number" || typeof page === "string")
    uri += `page=${page}&`;

  if (typeof collegeId === "number" || typeof collegeId === "string")
    uri += `college_Id=${collegeId}&`;
  if (typeof per === "number" || typeof per === "string")
    uri += `studentsPerPage=${per}&`;

  if (skills && Array.isArray(skills)) uri += `skills=${skills.join(",")}&`;
  else if (typeof skills === "string") uri += `skills=${skills}&`;

  if (typeof enrolledCourse === "string")
    uri += `enrolled_course=${enrolledCourse}&`;

  if (typeof city === "string") uri += `city=${city}&`;
  else if (typeof state === "string") uri += `state=${state}&`;
  return http.get(uri);
};

/* find by id */
const get = ({ id }) => {
  return http.get(`students/${id}`);
};

/* get all students stats */
const getAllStats = () => {
  return http.get("students/stats");
};

/* get stats of one college */
const getCollegeStats = (collegeId) => {
  return http.get(`students/stats?college_Id=${collegeId}`);
};

/* get all skills */
const getSkills = () => {
  return http.get("students/skills");
};

const studentService = { getAll, getAllStats, getCollegeStats, getSkills, get };
export default studentService;
export { getAll, getAllStats, getCollegeStats, getSkills, get };
