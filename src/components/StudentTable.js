import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import collegeService from "../services/college";
import LoadingSpinner from "./LoadingSpinner";
import TableFilters from "./TableFilter";
import { Box } from "@mui/system";
import studentService from "../services/student";
import {
  TableContainer,
  StyledHeader,
  ListContainer as StudentListContainer,
} from "./TableDivs";

const serialize = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [colleges, setColleges] = useState([{ value: "All", display: "All" }]);
  const [collegeId, setCollegeId] = useState("All");
  const [cities, setCities] = useState(["All"]);
  const [states, setStates] = useState(["All"]);
  const [courses, setCourses] = useState(["All"]);
  const [skill, setSkill] = useState("All");
  const [skills, setSkills] = useState(["All"]);
  const [city, setCity] = useState("All");
  const [state, setState] = useState("All");
  const [course, setCourse] = useState("All");
  const [totalPages, setTotalPages] = useState(2);
  const [page, setPage] = useState("1");
  const [query, setQuery] = useState({});
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const filters = [
    {
      value: state,
      label: "State",
      key: "state",
      values: states,
      delete: ["city"],
    },
    { value: city, label: "City", key: "city", values: cities, delete: [] },
    {
      value: course,
      label: "Enrolled Course",
      key: "enrolledCourse",
      values: courses,
      delete: [],
    },
    {
      value: skill,
      label: "Skills",
      key: "skills",
      values: skills,
      delete: [],
    },
    {
      value: collegeId,
      label: "College Name",
      key: "collegeId",
      values: colleges,
      delete: [],
    },
  ];

  const parseQuery = (search) => {
    const urlSearchParams = new URLSearchParams(search);
    const queryParams = Object.fromEntries(urlSearchParams.entries());
    setCity(queryParams.city ?? "All");
    setSkill(queryParams.skills ?? "All");
    setCollegeId(queryParams.collegeId ?? "All");
    setCourse(queryParams.enrolledCourse ?? "All");
    setState(queryParams.state ?? "All");
    setPage(queryParams.page ?? "1");
    return queryParams;
  };

  const getMetaData = () => {
    collegeService
      .getStates()
      .then((res) => res.data)
      .then((data) => setStates((s) => [s[0], ...data]));
    collegeService
      .getCourses()
      .then((res) => res.data)
      .then((data) => setCourses((s) => [s[0], ...data]));
    collegeService
      .getAll({ collegesPerPage: 101 })
      .then((res) =>
        res.data.Colleges.map((college) => ({
          value: college.id,
          display: college.name,
        }))
      )
      .then((data) => setColleges((s) => [s[0], ...data]));
    studentService
      .getSkills()
      .then((res) => res.data)
      .then((data) => setSkills((s) => [s[0], ...data]));
  };

  const getDependentMetaData = (query) => {
    collegeService
      .getCities({ state: query.state })
      .then((res) => res.data.map((x) => x._id))
      .then((data) => setCities((s) => [s[0], ...data]));
  };

  const getData = (queryParams) => {
    setLoading(true);
    studentService
      .getAll(queryParams)
      .then((res) => res.data)
      .then((data) => {
        setStudents(data.Students);
        setTotalPages(Math.ceil(data.totalCount / data.studentsPerPage));
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const putQuery = (query) => {
    history.push(`/students?${serialize(query)}`);
  };

  const onPageChange = (e, v) => {
    setPage(v);
    query["page"] = v;
    putQuery(query);
  };

  useEffect(() => {
    let queryParams = parseQuery(location.search);
    setQuery(queryParams);
    getData(queryParams);
    getDependentMetaData(queryParams);
  }, [location]);

  useEffect(() => {
    getMetaData();
  }, []);

  const openStudentProfile = (student) => {
    history.push(`/students/${student.id}`);
  };

  const column = [
    { key: "name", label: "Student Name" },
    { key: "id", label: "Student ID" },
    { key: "collegeName", label: "College Name" },
    { key: "enrolled_course", label: "Enrolled Course" },
    { key: "year_of_batch", label: "Batch Year" },
    { key: "state", label: "State" },
    { key: "city", label: "City" },
  ];

  return (
    <StudentListContainer>
      <StyledHeader>
        <div style={{ fontSize: "22px", fontWeight: "bold" }}>
          Students List
        </div>
        <TableFilters filters={filters} page={"students"} />
      </StyledHeader>
      <TableContainer>
        <table>
          <thead>
            <tr>
              {column.map((col, index) => {
                return (
                  <th key={"col-" + index}>
                    <div className="column-name">{col.label}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              return (
                <tr
                  key={"row-" + index}
                  onClick={() => {
                    openStudentProfile(student);
                  }}
                >
                  {column.map((col, colIndex) => {
                    return (
                      <td key={"row-" + index + "-cell-" + colIndex}>
                        <div className="cell-data">{student[col.key]}</div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {students.length <= 0 && !loading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "calc(100% - 50px)",
            }}
          >
            <div style={{ fontSize: "22px" }}>No Data Found</div>
          </div>
        )}
      </TableContainer>
      {loading && <LoadingSpinner />}
      <Box
        style={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: "24px",
          background: "#56565682",
        }}
      >
        <Pagination
          count={totalPages}
          page={+(page ?? 1)}
          onChange={onPageChange}
          color="primary"
        />
      </Box>
    </StudentListContainer>
  );
};

export default StudentTable;
