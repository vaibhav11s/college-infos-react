import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import collegeService from "../services/college";
import LoadingSpinner from "./LoadingSpinner";
import SimilarColleges from "./SimilarColleges";
import collegeLogo from "../assets/icons/collegelogo2.jpeg";
import {
  Header as CollegeHeader,
  InfoSection as CollegeInfoSection,
  Profile as CollegeProfile,
} from "./ProfileDivs";

const College = () => {
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(false);
  const [similars, setSimilars] = useState([]);
  const params = useParams();

  useEffect(() => {
    const id = params["id"];
    setSimilars([]);
    setLoading(true);
    collegeService
      .get({ id, withSimilar: true })
      .then((res) => res.data)
      .then((data) => {
        setCollege(data);
        setSimilars(data.similarColleges ?? []);
      })
      .catch((e) => {})
      .finally(() => setLoading(false));
  }, [params]);

  const renderCollegeHeader = () => {
    return (
      <CollegeHeader>
        <div className="logo">
          <img className="logo-icon" src={collegeLogo} alt="logo" />
        </div>
        <div className="item-name">
          <div className="name">{college.name}</div>
          <div className="std">EST. {college.year_founded}</div>
        </div>
      </CollegeHeader>
    );
  };

  const renderCollegeInfo = () => {
    return (
      <CollegeInfoSection>
        <div className="info">
          <div className="info-item">
            <div className="key">College Name</div>
            <div className="sep">:</div>
            <div className="value">{college.name}</div>
          </div>
          <div className="info-item">
            <div className="key">College ID</div>
            <div className="sep">:</div>
            <div className="value">{college.id}</div>
          </div>
          <div className="info-item">
            <div className="key">Std.</div>
            <div className="sep">:</div>
            <div className="value">{college.year_founded}</div>
          </div>
          <div className="info-item">
            <div className="key">City</div>
            <div className="sep">:</div>
            <div className="value">{college.city}</div>
          </div>

          <div className="info-item">
            <div className="key">State</div>
            <div className="sep">:</div>
            <div className="value">{college.state}</div>
          </div>
          <div className="info-item">
            <div className="key">Total Student</div>
            <div className="sep">:</div>
            <div className="value">
              <Link className="link" to={`/students?collegeId=${college.id}`}>
                {college.no_of_student}
              </Link>
              <span>Click to see all students</span>
            </div>
          </div>
          <div className="info-item">
            <div className="key">Courses</div>
            <div className="sep">:</div>
            <div className="value">{college.courses.join(", ")}</div>
          </div>
        </div>
      </CollegeInfoSection>
    );
  };

  return (
    <CollegeProfile>
      {loading && <LoadingSpinner />}
      {college && (
        <div>
          {renderCollegeHeader()}
          {renderCollegeInfo()}
          <SimilarColleges similars={similars} loading={loading} />
        </div>
      )}
    </CollegeProfile>
  );
};

export default College;
