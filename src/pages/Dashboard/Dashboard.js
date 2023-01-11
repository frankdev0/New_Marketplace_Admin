import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Iconly } from "react-iconly";
import "./Dashboard.css";
import SellersSidebar from "./dashboardComponents/SideBar";
import { AppContext } from "../../components/AppState";

const SellersDashboard = () => {
  const [categories, setCotegeries] = useState("");

  const { user } = useContext(AppContext);
  return (
    <div>
      <div className="grid-container">
        <header className="header">
          <div className="header__message">
            <h2>
              Hello {user.firstName} {user.LastName}
            </h2>
          </div>
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
          </div>
        </header>

        <SellersSidebar />

        <main
          className="main d-flex justify-content-center"
          style={{ padding: "100px" }}
        >
          <h1>Welcome to Tofa's MarketPlace Admin</h1>
        </main>
      </div>
    </div>
  );
};

export default SellersDashboard;
