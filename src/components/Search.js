import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };
  return (
    <div>
      <input
        type="text"
        className="form-control custom-style"
        id=""
        placeholder="Search for orders, inquiries and more"
        value={search}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
