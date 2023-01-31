import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Authentication.css";
import SiteLogo from "../../assets/img/logo.png";
import { axios } from "../../components/baseUrl.jsx";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const forgotPassword = {
        email: email,
      };
      const { data } = await axios.post(
        `/auth/forgot-password`,
        forgotPassword
      );
      console.log(data);
      setEmail("");
      Store.addNotification({
        title: "Successful!",
        message: `A password reset link has been sent to ${email}`,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
        isMobile: true,
        breakpoint: 768,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Store.addNotification({
        title: "Failed!",
        message: "Try Again.",
        type: "danger",
        insert: "top",
        container: "top-left",
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
        <section className="auth">
          <ReactNotifications />
          <div className="auth-lhs">
            <div className="auth-lhs-header">
              <img className="site-logo" src={SiteLogo} alt="tofa" />
            </div>
          </div>
          <div className="auth-rhs">
            <div className="auth-rhs-header d-flex justify-content-between">
              <img
                className="site-logo mobile-only"
                src={SiteLogo}
                alt="tofa"
              />
            </div>
            <div className="auth-rhs-content d-flex align-items-center">
              <div className="rhs-inner">
                <h2>Forgot Password</h2>
                <div className="auth-account-wrap">
                  <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Input Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        name="email"
                        onChange={handleEmail}
                      />
                    </div>

                    {loading ? (
                      <button type="submit" className="btn btn-danger">
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-danger">
                        Submit
                      </button>
                    )}

                    <p>
                      Remember your password?{" "}
                      <Link to="/login" className="user-link">
                        Login here
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ForgotPassword;
