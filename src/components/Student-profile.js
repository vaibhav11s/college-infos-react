import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import studentService from "../services/student";
import LoadingSpinner from "./LoadingSpinner";
import studentLogo from "../assets/icons/student-icon.png";
import {
  Header as StudentHeader,
  InfoSection as StudentInfoSection,
  Profile as StudentProfile,
} from "./ProfileDivs";

const Student = () => {
  const [student, setStudent] = useState(null);
  const params = useParams();

  useEffect(() => {
    const id = params["id"];
    studentService
      .get({ id })
      .then((res) => res.data)
      .then((data) => setStudent(data))
      .catch((e) => {});
  }, [params]);

  const renderStudentHeader = () => {
    return (
      <StudentHeader>
        <div className="logo">
          <img className="logo-icon" src={studentLogo} alt="logo" />
        </div>
        <div className="item-name">
          <div className="name">{student.name}</div>
          <div className="std">{student.college[0].name}</div>
        </div>
      </StudentHeader>
    );
  };

  const renderStudentInfo = () => {
    return (
      <StudentInfoSection>
        <div className="info">
          <div className="info-item">
            <div className="key">Student Name</div>
            <div className="sep">:</div>
            <div className="value">{student.name}</div>
          </div>

          <div className="info-item">
            <div className="key">Student ID</div>
            <div className="sep">:</div>
            <div className="value">{student.id}</div>
          </div>
          <div className="info-item">
            <div className="key">College Name</div>
            <div className="sep">:</div>
            <div className="value">
              <a className="link" href={`/colleges/${student.college_Id}`}>
                {student.college[0].name}
              </a>
            </div>
          </div>
          <div className="info-item">
            <div className="key">Course Name</div>
            <div className="sep">:</div>
            <div className="value">{student.enrolled_course}</div>
          </div>
          <div className="info-item">
            <div className="key">Graduation Year</div>
            <div className="sep">:</div>
            <div className="value">{student.year_of_batch}</div>
          </div>
          <div className="info-item">
            <div className="key">Father Name</div>
            <div className="sep">:</div>
            <div className="value">{student.father}</div>
          </div>

          <div className="info-item">
            <div className="key">Date of Birth</div>
            <div className="sep">:</div>
            <div className="value">{student.dob}</div>
          </div>

          <div className="info-item">
            <div className="key">City</div>
            <div className="sep">:</div>
            <div className="value">{student.city}</div>
          </div>

          <div className="info-item">
            <div className="key">State</div>
            <div className="sep">:</div>
            <div className="value">{student.state}</div>
          </div>
          <div className="info-item">
            <div className="key">Contact Number</div>
            <div className="sep">:</div>
            <div className="value">{student.contact}</div>
          </div>
          <div className="info-item">
            <div className="key">Skills</div>
            <div className="sep">:</div>
            <div className="value">{student.skills.join(", ")}</div>
          </div>
        </div>
      </StudentInfoSection>
    );
  };

  return (
    <StudentProfile>
      {student ? (
        <div className="student-container">
          {renderStudentHeader()}
          {renderStudentInfo()}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </StudentProfile>
  );
};

export default Student;
