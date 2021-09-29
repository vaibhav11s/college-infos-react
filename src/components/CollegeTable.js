import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import collegeService from "../services/college";
import LoadingSpinner from "./LoadingSpinner";
import TableFilters from "./TableFilter";
import { Box } from "@mui/system";
import {
  TableContainer,
  StyledHeader,
  ListContainer as CollegeListContainer,
} from "./TableDivs";

const serialize = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

const CollegeTable = () => {
  const [colleges, setColleges] = useState([]);
  const [cities, setCities] = useState(["All"]);
  const [states, setStates] = useState(["All"]);
  const [courses, setCourses] = useState(["All"]);
  const [city, setCity] = useState("All");
  const [state, setState] = useState("All");
  const [course, setCourse] = useState("All");
  const [totalPages, setTotalPages] = useState(2);
  const [page, setPage] = useState("1");
  const [query, setQuery] = useState({});
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // const [filters,setFilters] = useState([
  //   {value:'All',label:'State',values:states,onChange:onStateChange},
  // ]);
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
      label: "Courses",
      key: "courses",
      values: courses,
      delete: [],
    },
  ];

  const parseQuery = (search) => {
    const urlSearchParams = new URLSearchParams(search);
    const queryParams = Object.fromEntries(urlSearchParams.entries());
    setCity(queryParams.city ?? "All");
    setCourse(queryParams.courses ?? "All");
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
  };

  const getDependentMetaData = (query) => {
    collegeService
      .getCities({ state: query.state })
      .then((res) => res.data.map((x) => x._id))
      .then((data) => setCities((s) => [s[0], ...data]));
  };

  const getData = (queryParams) => {
    setLoading(true);
    collegeService
      .getAll(queryParams)
      .then((res) => res.data)
      .then((data) => {
        setLoading(false);
        setColleges(data.Colleges);
        setTotalPages(Math.ceil(data.totalCount / data.collegesPerPage));
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const putQuery = (query) => {
    history.push(`/colleges?${serialize(query)}`);
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

  const openCollegeProfile = (college) => {
    history.push(`/colleges/${college.id}`);
  };

  const column = [
    { key: "name", label: "College Name" },
    { key: "id", label: "College ID" },
    { key: "city", label: "City" },
    { key: "no_of_student", label: "No of Students" },
    { key: "year_founded", label: "EST" },
    { key: "state", label: "State" },
  ];

  return (
    <CollegeListContainer>
      <StyledHeader>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>College List</div>
        <TableFilters filters={filters} page={"colleges"} />
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
            {colleges.map((college, index) => {
              return (
                <tr
                  key={"row-" + index}
                  onClick={() => {
                    openCollegeProfile(college);
                  }}
                >
                  {column.map((col, colIndex) => {
                    return (
                      <td key={"row-" + index + "-cell-" + colIndex}>
                        <div className="cell-data">{college[col.key]}</div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {colleges.length <= 0 && !loading && (
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
    </CollegeListContainer>
  );
};

export default CollegeTable;
