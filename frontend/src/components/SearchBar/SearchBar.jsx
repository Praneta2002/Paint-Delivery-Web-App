import React from 'react';

const SearchBar = ({ SearchQuery, setSearchQuery }) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search term state
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={SearchQuery}
        onChange={handleSearchChange}
        placeholder="Search paintings..."
      />
    </div>
  );
};

export default SearchBar;
