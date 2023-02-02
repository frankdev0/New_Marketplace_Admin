import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Avatar from "@mui/material/Avatar";
// import passport from "../../../assets/img/passport.jpg";
import SellersSidebar from "../dashboardComponents/SideBar";
import { axios } from "../../../components/baseUrl";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState({
    firstName: "",
    LastName: "",
    password: "",
    role: "",
    phoneNumber: "",
    email: "",
    hearAboutUs: "",
  });

  const handleChange = (e) => {
    setUserRole({ ...userRole, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(userRole);
    try {
      const { data } = await axios.post("/auth/admin-register-user", userRole);
      Store.addNotification({
        title: "Successful!",
        message: `A user has been created successfully`,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
        isMobile: true,
        breakpoint: 768,
      });
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Store.addNotification({
        title: "Failed",
        message: `${error.response.data.errors[0].message}`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
        isMobile: true,
        breakpoint: 768,
      });
    }
  };
  return (
    <>
      <div>
        <div className="grid-container">
          <ReactNotifications />
          <header className="header">
            <div className="header__message">
              <h2>My Account</h2>
            </div>
            <div className="header__search">
              <div className="notify-wrap position-relative">
                <i className="fa fa-bell" aria-hidden="true"></i>
                <span className="seller icon-notification position-absolute"></span>
              </div>
            </div>
          </header>

          <SellersSidebar />

          <main className="main">
            <div className="main-overview">
              <div className="overview-card">
                <div className="seller-profile-card">
                  <div className="seller-profile-pic">
                    {/* <Avatar
                      alt="Remy Sharp"
                      src={passport}
                      sx={{ width: 100, height: 100 }}
                    /> */}
                  </div>
                  <div className="seller-setting-profile">
                    <h4>Profile</h4>
                    <p>Update your profile picture and personal details</p>
                    <Link to="#">Update your profile</Link>
                  </div>
                </div>

                <div className="seller-setting-form">
                  <form onSubmit={handleSubmit}>
                    <div className="seller-setting-formgroup">
                      <div className="form-group-right">
                        <div className="form-group">
                          <label>Firstname</label>
                          <input
                            className="form-control"
                            name="firstName"
                            type="text"
                            id="fullname"
                            onChange={handleChange}
                            placeholder="Firstname"
                          />
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            className="form-control"
                            type="text"
                            name="email"
                            onChange={handleChange}
                            id="businessname"
                            placeholder="Fushion & co"
                          />
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            className="form-control"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            id="text"
                            placeholder="********"
                          />
                        </div>
                        {/* <div className="form-group">
                          <label>Hear About Us</label>
                          <select
                            className="form-control bg-light user-input"
                            onChange={handleChange}
                            name="hearAboutUs"
                          >
                            <option>...Select</option>
                            <option>OLD_MUTUAL</option>
                            <option>AFCTCA</option>
                            <option>Others</option>
                          </select>
                        </div> */}
                        {/* <div className="seller-seting-submit my-4"> */}
                        {/* <button type="submit" className="btn btn-dark mx-4">
                            Create User
                          </button> */}
                        {/* <button type="submit" className="btn btn-primary">
                            Change Password
                          </button> */}
                        {/* </div> */}
                        <div className="seller-seting-submit my-4">
                          {loading ? (
                            <button type="submit" className="btn btn-dark px-5">
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            </button>
                          ) : (
                            <button type="submit" className="btn btn-dark">
                              Create User
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="form-group-left">
                        <div className="form-group">
                          <label>Lastname</label>
                          <input
                            className="form-control"
                            type="text"
                            name="LastName"
                            onChange={handleChange}
                            id="country"
                            placeholder="Lastname"
                          />
                        </div>
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input
                            className="form-control"
                            type="number"
                            id="phonenumber"
                            name="phoneNumber"
                            onChange={handleChange}
                            placeholder="+234-567-890-123"
                          />
                        </div>
                        <div className="form-group">
                          <label>Employee Role</label>
                          <select
                            className="form-control bg-light user-input"
                            onChange={handleChange}
                            name="role"
                          >
                            <option>....Please Select a Role</option>
                            <option>SUPER_ADMIN</option>
                            <option>SOURCE_PRO_ADMIN</option>
                            <option>MARKETPLACE_ADMINN</option>
                            <option>FINANCE</option>
                            <option>WEBSITE_ADMIN</option>
                            <option>SOURCE_PRO_AGENT</option>
                            <option>AFCTCA</option>
                            <option>OLD_MUTUAL</option>
                          </select>
                          {/* <input
                            className="form-control"
                            type="text"
                            id="subscription"
                          /> */}
                        </div>
                        {/* <div className="seller-seting-joindate">
                          <p>Joined Since</p>
                          <p>March 15th 2019</p>
                        </div> */}
                      </div>
                      {/* <button type="submit" className="btn btn-dark">
                        Create User
                      </button> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Settings;
