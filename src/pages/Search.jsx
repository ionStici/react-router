import { useSearchParams } from '../router/Hooks';

const filters = ['all', 'active', 'inactive'];
const sortBys = ['name', 'price', 'age'];

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateFilter = (filterValue) => {
    setSearchParams({ filter: filterValue });
  };

  const updateSortBy = (sortByValue) => {
    setSearchParams({ sortBy: sortByValue });
  };

  const activeFilter = searchParams.get('filter');
  const activeSortBy = searchParams.get('sortBy');

  return (
    <div>
      <h1>Search</h1>

      <h2>Filter</h2>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => updateFilter(filter)}
          className={`${filter === activeFilter ? 'activeBtn' : ''}`}
        >
          {filter}
        </button>
      ))}

      <h2>Sort By</h2>
      {sortBys.map((sortBy) => (
        <button
          key={sortBy}
          onClick={() => updateSortBy(sortBy)}
          className={`${sortBy === activeSortBy ? 'activeBtn' : ''}`}
        >
          {sortBy}
        </button>
      ))}
    </div>
  );
}

export default Search;
