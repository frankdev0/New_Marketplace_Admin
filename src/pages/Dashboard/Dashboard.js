import React, { useContext } from "react";
import "./Dashboard.css";
import SellersSidebar from "./dashboardComponents/SideBar";
import { AppContext } from "../../components/AppState";

const SellersDashboard = () => {
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
                <i className="fa fa-search" aria-hidden="true"></i>
                <input
                  type="text"
                  className="form-control custom-style"
                  id=""
                  placeholder="Search for orders, inquiries and more"
                />
              </div>
            </form>

            <div className="notify-wrap position-relative">
              <i className="fa fa-bell" aria-hidden="true"></i>
              <span className="seller icon-notification position-absolute"></span>
            </div>
          </div>
        </header>

        <SellersSidebar />

        <main
          className="main d-flex justify-content-center"
          style={{ padding: "100px" }}
        >
          <div>
            <h1>Welcome to Tofa's MarketPlace Admin</h1>
            <div>
              <h4>Click on the Link Below to Login</h4>
              <a href="/login">Login to Market Place Admin</a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellersDashboard;
