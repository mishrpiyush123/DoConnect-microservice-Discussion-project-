function SearchBar({ searchText, setSearchText, onSearch }) {
  return (
    <div className="search-row">
      <input
        type="text"
        placeholder="Search questions..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button className="btn btn-primary btn-sm" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;