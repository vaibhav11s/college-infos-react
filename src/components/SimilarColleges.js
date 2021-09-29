import styled from "@emotion/styled";
import { useHistory } from "react-router";
import { CircularProgress } from "@mui/material";

const HorizontalScroll = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  flex: right;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-right: 24px;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const CollegePreview = styled.div`
  width: 160px;
  margin: 2px;
  background-color: rgb(0 0 0 / 22%);
  border-radius: 5px;
  height: 150px;
  & p {
    margin-: 2px;
    width: 155px;
    margin-left: 7px;
    margin-right: 7px;
  }
  & .courses {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .state {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .name {
    height: 44px;
    font-weight: bold;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const SimilarCollegesWrapper = styled.div`
  margin-top: 50px;
  & .head {
    font-weight: bold;
  }
`;

const SimilarColleges = ({ loading, similars }) => {
  const history = useHistory();

  const gotoCollege = (id) => {
    if (id) history.push(`/colleges/${id}`);
  };

  return (
    <>
      {loading && <CircularProgress />}
      {similars.length > 0 && (
        <SimilarCollegesWrapper>
          <p className="head">Similar colleges : </p>
          <HorizontalScroll>
            {similars.map((college) => (
              <CollegePreview
                onClick={() => {
                  gotoCollege(college.id);
                }}
                key={college._id}
              >
                <p className="name">{college.name}</p>
                <p className="state">{college.state}</p>
                <p title={college.courses.join(",")} className="courses">
                  {college.courses.join(",")}
                </p>
              </CollegePreview>
            ))}
          </HorizontalScroll>
        </SimilarCollegesWrapper>
      )}
    </>
  );
};

export default SimilarColleges;
