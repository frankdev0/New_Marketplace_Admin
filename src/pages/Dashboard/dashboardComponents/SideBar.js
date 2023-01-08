import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Iconly } from "react-iconly";
import "../../Dashboard/Dashboard.css";
import "./Sidebar.css";
import { axios } from "../../../components/baseUrl";
import { ProtectedRoutes } from "../../../components/ProtectedRoutes";
import swal from "sweetalert";
import { AppContext } from "../../../components/AppState";

const SellersSidebar = () => {
  // const [open, setOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

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
          navigate("/login");
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
            <div className="flex-grow-1 ms-2">
              <p>Erhun Abbe</p>
            </div>
          </div>
        </div>

        <h2 className="sidenav_title">Dashboard</h2>

        {/* <div className="switch-wrap">
          <div className="switch d-flex justify-content-between">
            <div className="switch-lhs">
              <Link to="/buyer/dashboard">Buy</Link>
            </div>
            <div className="switch-rhs">
              <Link to="/seller/dashboard">Sell</Link>
            </div>
          </div>
        </div> */}

        <ul className="sidenav__list">
          <Link className="sidenav-link" to="/overview">
            <li className="sidenav__list-item">
              <Iconly className="list_icon" name="Home" size="small" />
              Overview
            </li>
          </Link>

          <Link className="sidenav-link" to="/buyers">
            <li className="sidenav__list-item">
              <Iconly className="list_icon" name="People" size="small" />
              Buyers
            </li>
          </Link>

          <Link className="sidenav-link" to="/sellers">
            <li className="sidenav__list-item">
              <Iconly className="list_icon" name="People" size="small" />
              Sellers
            </li>
          </Link>

          {/* <div className={open ? "sidebar-item open" : "sidebar-item"}>
            <div className="sidenav-link">
              <li className="sidenav__list-item" onClick={() => setOpen(!open)}>
                <Iconly className="list_icon" name="People" size="small" />
                Buyers
              </li>
              <i
                className="bi bi-caret-right-fill toggle-btn"
                onClick={() => setOpen(!open)}
              ></i>
            </div>

            <div className="sidebar-content">
              <ul
                className="nav flex-column mx-4"
                style={{ textAlign: "left" }}
              >
                <li className="nav-item">
                  <a className="nav-link sidenav__list-item" href="/buyers">
                    All Buyers
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link sidenav__list-item"
                    href="/testimonial"
                  >
                    Old mutual
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link sidenav__list-item" href="/traction">
                    After
                  </a>
                </li>
              </ul>
            </div>
          </div> */}

          {/* <div className={isOpen ? "sidebar-item open" : "sidebar-item"}>
            <div className="sidenav-link">
              <li
                className="sidenav__list-item"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Iconly className="list_icon" name="People" size="small" />
                Sellers
              </li>
              <i
                className="bi bi-caret-right-fill toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
              ></i>
            </div>

            <div className="sidebar-content">
              <ul
                className="nav flex-column mx-4"
                style={{ textAlign: "left" }}
              >
                <li className="nav-item">
                  <a className="nav-link sidenav__list-item" href="/sellers">
                    All Sellers
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link sidenav__list-item"
                    href="/testimonial"
                  >
                    Old mutual Sellers
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link sidenav__list-item" href="/traction">
                    After Sellers
                  </a>
                </li>
              </ul>
            </div>
          </div> */}

          {/* <Link className="sidenav-link" to="/buyers">
            <li className="sidenav__list-item">
              <Iconly className="list_icon" name="People" size="small" />
              Buyers
            </li>
          </Link>
          <Link className="sidenav-link" to="/sellers">
            <li className="sidenav__list-item">
              <Iconly className="list_icon" name="People" size="small" />
              Sellers
            </li>
          </Link> */}

          <Link className="sidenav-link" to="/transactions">
            <li className="sidenav__list-item">
              <Iconly className="list_icon" name="Paper" size="small" />
              Transactions
            </li>
          </Link>
          <Link className="sidenav-link" to="/categories">
            <li className="sidenav__list-item">
              <Iconly className="list_icon" name="Filter" size="small" />
              Category
            </li>
          </Link>

          <Link className="sidenav-link" to="/product-listing">
            <li className="sidenav__list-item">
              <Iconly className="list_icon" name="Category" size="small" />
              Products
            </li>
          </Link>
          <Link className="sidenav-link" to="/sellers-subscription">
            <li className="sidenav__list-item">
              <Iconly className="list_icon" name="Star" size="small" />
              Subscriptions
            </li>
          </Link>

          {/* <Link className="sidenav-link" to="/seller/message-center">
            <li className="sidenav__list-item">
              <Iconly
                className="list_icon position-relative"
                name="Message"
                set="light"
                size="small"
              />
              Message Center
              <span className="icon-notification position-absolute"></span>
            </li>
          </Link> */}

          <Link className="sidenav-link" to="/rfqs">
            <li className="sidenav__list-item">
              <Iconly className="list_icon" name="Folder" size="small" />
              RFQs
            </li>
          </Link>
          <Link className="sidenav-link" to="/disputes">
            <li className="sidenav__list-item">
              <Iconly className="list_icon" name="Chat" size="small" />
              Disputes
            </li>
          </Link>

          <Link className="sidenav-link" to="/settings">
            <li className="sidenav__list-item">
              <Iconly className="list_icon" name="Setting" size="small" />
              Settings
            </li>
          </Link>

          <Link to="/login" className="sidenav-link" onClick={handleLogout}>
            <li className="sidenav__list-item">
              <Iconly
                className="nav-icon"
                name="Logout"
                size="small"
                style={{ marginRight: "15px" }}
              />
              Logout
            </li>
          </Link>
        </ul>
      </aside>
    </>
  );
};

export default ProtectedRoutes(SellersSidebar);
