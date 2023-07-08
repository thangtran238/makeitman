import React, { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const results = [];
    setSearchResults(results);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Tìm kiếm công thức..."
        />
        <button type="submit">Tìm kiếm</button>
      </form>

      {searchResults.length > 0 ? (
        <div>
          <h2>Kết quả tìm kiếm</h2>
          <ul>
            {searchResults.map((recipe) => (
              <li key={recipe.id}>{recipe.title}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;