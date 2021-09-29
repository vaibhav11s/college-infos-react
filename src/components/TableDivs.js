import styled from "@emotion/styled";

export const TableContainer = styled.div`
  height: calc(100% - 110px);
  overflow: auto;
  table {
    border-collapse: collapse;
    background: rgb(134 134 134 / 38%);
    width: 100%;
    color: white;
    thead {
      tr {
        position: sticky;
        top: 0;
        left: 0;
        z-index: 3;
        background: #c0bfbfb0;
      }
      tr > th {
        text-align: left;
        .column-name {
          padding: 10px 24px;
        }
      }
    }
    tbody {
      tr {
        border-bottom: 1px solid #eaeaea33;
        td .cell-data {
          padding: 10px 24px;
        }
        :hover {
          background: #171818a1;
        }
      }
    }
  }
`;

export const StyledHeader = styled.div`
  height: 60px;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

export const ListContainer = styled.div`
  height: 100%;
  overflow: hidden;
  .MuiPaginationItem-root {
    color: white;
  }
  .Mui-selected {
    background-color: #8e9399a1;
  }
`;
