import { useSearchParams } from "../router/RouterProvider";

const filters = ["all", "active", "inactive"];
const sortBys = ["name", "price", "age"];

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateFilter = (filterValue) => {
    setSearchParams({ filter: filterValue });
  };

  const updateSortBy = (sortByValue) => {
    setSearchParams({ sortBy: sortByValue });
  };

  const activeFilter = searchParams.get("filter");
  const activeSortBy = searchParams.get("sortBy");

  return (
    <div>
      <h1>Search</h1>

      <p>
        <span>Filter:</span>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => updateFilter(filter)}
            className={`${filter === activeFilter ? "activeBtn" : ""}`}
          >
            {filter}
          </button>
        ))}
      </p>

      <p>
        <span>Sort By:</span>
        {sortBys.map((sortBy) => (
          <button
            key={sortBy}
            onClick={() => updateSortBy(sortBy)}
            className={`${sortBy === activeSortBy ? "activeBtn" : ""}`}
          >
            {sortBy}
          </button>
        ))}
      </p>
    </div>
  );
}

export default Search;
