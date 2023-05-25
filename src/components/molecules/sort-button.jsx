import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

const SortButton = ({ getSortType, getSortData }) => {
  const [sortType, setSortType] = React.useState("newest");

  const handleChange = async (event) => {
    const selectedSort = event.target.value;
    setSortType(selectedSort);
    getSortType(selectedSort);
    if (selectedSort !== sortType) {
      try {
        const getRecipes = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/users/recipes/search/?page=1&limit=6&sort=true&sortType=${selectedSort}`
        );

        getSortData(getRecipes?.data?.data);
      } catch (error) {
        console.log("errorPagination", error);
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
        label="Age"
        onChange={handleChange}>
        <MenuItem value="" disabled>
          <em>None</em>
        </MenuItem>
        <MenuItem value="1">A-Z</MenuItem>
        {/* <MenuItem value="z-a">Z-A</MenuItem> */}
        <MenuItem value="2">Newest</MenuItem>
        {/* <MenuItem value="oldest">Oldest</MenuItem> */}
      </Select>
    </FormControl>
  );
};

export default SortButton;
