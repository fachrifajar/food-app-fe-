import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

const SortButton = ({ getSortType, getSortData, urlParams }) => {
  const [sortType, setSortType] = React.useState("createdDesc");

  const handleChange = async (event) => {
    const selectedSort = event.target.value;
    setSortType(selectedSort);
    getSortType(selectedSort);

    if (selectedSort !== sortType) {
      console.count("fetch sort");
      try {
        const getRecipes = await axios.get(
          `${import.meta.env.VITE_BASE_URL}${urlParams}${selectedSort}`
        );

        getSortData(getRecipes?.data?.data);
      } catch (error) {
        // console.log("errorPagination", error);
      }
    }
  };

  return (
    <FormControl sx={{ minWidth: 120 }} size="small" className="sort-button">
      <InputLabel id="demo-select-small-label">Sort By</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sortType}
        onChange={handleChange}
        defaultValue="createdDesc">
        <MenuItem value="" disabled>
          <em>None</em>
        </MenuItem>
        <MenuItem value="loveDesc" disabled={sortType === "loveDesc"}>
          Most Popular
        </MenuItem>
        <MenuItem value="loveAsc" disabled={sortType === "loveAsc"}>
          Less Popular
        </MenuItem>
        <MenuItem value="createdDesc" disabled={sortType === "createdDesc"}>
          Newest
        </MenuItem>
        <MenuItem value="createdAsc" disabled={sortType === "createdAsc"}>
          Oldest
        </MenuItem>
        <MenuItem value="titleAsc" disabled={sortType === "titleAsc"}>
          A-Z
        </MenuItem>
        <MenuItem value="titleDesc" disabled={sortType === "titleDesc"}>
          Z-A
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortButton;
