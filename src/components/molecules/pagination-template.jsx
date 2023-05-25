import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";

export default function PaginationTemplate({
  count,
  pages,
  fetchedData,
  sortType,
}) {
  const [currentPages, setCurrentPages] = React.useState(1);

  const handlePageChange = async (event, page) => {
    setCurrentPages(page);
    console.log("sortTypeee", sortType);
    try {
      if (currentPages !== page) {
        pages(page);
        const getRecipes = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/users/recipes/search/?page=${page}&limit=6&sort=true&sortType=${sortType}`
        );

        fetchedData(getRecipes?.data?.data);
      }
    } catch (error) {
      console.log("errorPagination", error);
    }
  };



  return (
    <Stack spacing={2}>
      <Pagination count={count} shape="rounded" onChange={handlePageChange} />
    </Stack>
  );
}
