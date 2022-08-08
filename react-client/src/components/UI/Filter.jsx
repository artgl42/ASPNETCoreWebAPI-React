// @ts-nocheck
import React from "react";
import { Stack } from "react-bootstrap";

export default function Filter({ selectOpt, filterOpt, setFilterOpt }) {
  return (
    <Stack
      direction="horizontal"
      gap={1}
      style={{ marginTop: "5px", marginLeft: "5px" }}
    >
      <select
        value={filterOpt.selectedSort}
        onChange={(e) =>
          setFilterOpt({ ...filterOpt, selectedSort: e.target.value })
        }
      >
        <option disabled value="">
          Sort by
        </option>
        {selectOpt.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search..."
        value={filterOpt.searchQuery}
        onChange={(e) =>
          setFilterOpt({ ...filterOpt, searchQuery: e.target.value })
        }
      />
    </Stack>
  );
}
