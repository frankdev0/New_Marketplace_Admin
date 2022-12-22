import React, { useContext } from "react";
import { axios } from "./baseUrl";
import { Iconly } from "react-iconly";
import { AppContext } from "./AppState";

const LeftNavBar = () => {
  const handleLogout = async () => {
    try {
      axios.get("/auth/signout").then((response) => {
        console.log(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { user } = useContext(AppContext);
  console.log("this is my user", user);
  return (
    <div>
      <div className="header__search">
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
            />
          </div>
        </form>

        <div className="notify-wrap position-relative">
          <Iconly
            name="Notification"
            set="bulk"
            primaryColor="#282828"
            size="medium"
          />
          <span className="seller icon-notification position-absolute"></span>
        </div>
        <button className="btn btn-dark mx-2" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default LeftNavBar;
