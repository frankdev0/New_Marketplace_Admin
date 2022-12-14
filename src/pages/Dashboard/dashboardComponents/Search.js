import React, { useEffect, useState } from "react";
import { Iconly } from "react-iconly";
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
          <Iconly
            name="Search"
            set="light"
            primaryColor="#5C5C5C"
            size="medium"
          />
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
