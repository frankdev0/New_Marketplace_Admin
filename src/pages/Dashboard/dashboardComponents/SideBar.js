import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../Dashboard/Dashboard.css";
import "./Sidebar.css";
import { axios } from "../../../components/baseUrl";
import swal from "sweetalert";
import { AppContext } from "../../../components/AppState";

const SellersSidebar = () => {
  const { user } = useContext(AppContext);

  const handleLogout = async () => {
    try {
      axios.get("/auth/signout").then((response) => {
        console.log(response.data.data);

        if (response.data.data) {
          swal({
            title: "Logout",
            text: "You've Logged Out Successfully",
            icon: "success",
            button: "ok",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <aside id="seller" className="sidenav">
        <div className="sidenav__close-icon">
          <i className="fas fa-times sidenav__brand-close"></i>
        </div>

        <div className="user-area">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0 user-area-art">
              {user.firstName && user.firstName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-grow-1 ms-2">{/* <p>Erhun Abbe</p> */}</div>
          </div>
        </div>

        <h2 className="sidenav_title">Dashboard</h2>

        <ul className="sidenav__list">
          <Link className="sidenav-link" to="/overview">
            <li className="sidenav__list-item">
              {/* <Iconly className="list_icon" name="Home" size="small" /> */}
              <i className="fa fa-home list_icon" aria-hidden="true"></i>
              Overview
            </li>
          </Link>

          <Link className="sidenav-link" to="/buyers">
            <li className="sidenav__list-item">
              {/* <Iconly className="list_icon" name="People" size="small" /> */}
              <i
                className="fa fa-shopping-cart list_icon"
                aria-hidden="true"
              ></i>
              Buyers
            </li>
          </Link>

          <Link className="sidenav-link" to="/sellers">
            <li className="sidenav__list-item">
              {/* <Iconly className="list_icon" name="People" size="small" /> */}
              <i className="fa fa-users list_icon" aria-hidden="true"></i>
              Sellers
            </li>
          </Link>
          <Link className="sidenav-link" to="/transactions">
            <li className="sidenav__list-item">
              {/* <Iconly className="list_icon" name="Paper" size="small" /> */}
              <i
                className="fa fa-shopping-bag list_icon"
                aria-hidden="true"
              ></i>
              Transactions
            </li>
          </Link>
          <Link className="sidenav-link" to="/categories">
            <li className="sidenav__list-item">
              {/* <Iconly className="list_icon" name="Filter" size="small" /> */}
              <i className="fa fa-sliders list_icon" aria-hidden="true"></i>
              Category
            </li>
          </Link>

          <Link className="sidenav-link" to="/product-listing">
            <li className="sidenav__list-item">
              {/* <Iconly className="list_icon" name="Category" size="small" /> */}
              <i className="fa fa-th-large list_icon" aria-hidden="true"></i>
              Products
            </li>
          </Link>
          <Link className="sidenav-link" to="/sellers-subscription">
            <li className="sidenav__list-item">
              {/* <Iconly className="list_icon" name="Star" size="small" /> */}
              <i className="fa fa-star-o list_icon" aria-hidden="true"></i>
              Subscriptions
            </li>
          </Link>

          <Link className="sidenav-link" to="/rfqs">
            <li className="sidenav__list-item">
              {/* <Iconly className="list_icon" name="Folder" size="small" /> */}
              <i className="fa fa-file-text list_icon" aria-hidden="true"></i>
              RFQs
            </li>
          </Link>
          <Link className="sidenav-link" to="/disputes">
            <li className="sidenav__list-item">
              {/* <Iconly className="list_icon" name="Chat" size="small" /> */}
              <i
                className="fa fa-commenting-o list_icon"
                aria-hidden="true"
              ></i>
              Disputes
            </li>
          </Link>

          <Link className="sidenav-link" to="/settings">
            <li className="sidenav__list-item">
              {/* <Iconly className="list_icon" name="Setting" size="small" /> */}
              <i className="fa fa-cog list_icon" aria-hidden="true"></i>
              Settings
            </li>
          </Link>

          <Link to="/login" className="sidenav-link" onClick={handleLogout}>
            <li className="sidenav__list-item">
              {/* <Iconly
                className="nav-icon"
                name="Logout"
                size="small"
                style={{ marginRight: "15px" }}
              /> */}
              <i className="fa fa-sign-out list_icon" aria-hidden="true"></i>
              {user ? "Logout" : "Login"}
            </li>
          </Link>
        </ul>
      </aside>
    </>
  );
};

export default SellersSidebar;
