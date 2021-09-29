import styled from "@emotion/styled";
import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const TableFiltersContainer = styled.div`
  .MuiOutlinedInput-root,
  MuiInputBase-root MuiInputBase-colorPrimary,
  MuiInputBase-formControl {
    height: 32px !important;
  }

  overflow-x: scroll;
  height: 50px;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  display: flex;
  align-items: center;

  .MuiFormControl-root,
  .MuiTextField-root {
    width: 160px;
  }

  .MuiSvgIcon-fontSizedMedium,
  .MuiSelect-icon {
    color: white !important;
  }
  label {
    color: white !important;
  }
  .MuiInputBase-root {
    color: white;
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: white;
    :hover {
      border-color: red;
    }
  }
`;
const serialize = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

const TableFilters = ({ filters, page }) => {
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState({});
  const parseQuery = (search) => {
    const urlSearchParams = new URLSearchParams(search);
    const queryParams = Object.fromEntries(urlSearchParams.entries());
    return queryParams;
  };

  useEffect(() => {
    let params = parseQuery(location.search);
    setQuery(params);
  }, [location.search]);

  const onChangeFilter = (filter, value) => {
    query[filter.key] = value;
    delete query["page"];
    if (value === "All") {
      delete query[filter.key];
    }
    filter.delete?.forEach((item) => {
      delete query[item];
    });
    history.push("/" + page + "?" + serialize(query));
    setQuery({ ...query });
  };
  return (
    <TableFiltersContainer>
      {filters?.map((filterItem) => {
        return (
          <div style={{ marginLeft: "12px" }} key={filterItem.label}>
            <TextField
              select
              label={filterItem.label}
              value={filterItem.value}
              onChange={(e) => {
                onChangeFilter(filterItem, e.target.value);
              }}
            >
              {filterItem.values.map((item) => (
                <MenuItem
                  key={`${filterItem.label}-${item.value ?? item}`}
                  value={item.value ?? item}
                >
                  {item.display ?? item}
                </MenuItem>
              ))}
            </TextField>
          </div>
        );
      })}
    </TableFiltersContainer>
  );
};

export default TableFilters;
