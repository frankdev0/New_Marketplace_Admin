import React, { useState } from "react";
const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };

  return (
    <div>
      <form>
        <div className="custom__search">
          <i className="fa fa-search" aria-hidden="true"></i>
          <input
            type="text"
            className="form-control custom-style"
            id=""
            placeholder="Search for orders, inquiries and more"
            value={search}
            onChange={(e) => onInputChange(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
