import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Authentication.css";
import SiteLogo from "../../assets/img/logo.png";
import { axios } from "../../components/baseUrl.jsx";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

const SecurityQuestion = () => {
  const navigate = useNavigate();
  const [SecurityQuestion, setSecurityQuestion] = useState({
    question_one: "",
    question_two: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSecurityQuestion({
      ...SecurityQuestion,
      [e.target.name]: e.target.value,
    });
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
              <img className="site-logo" src={SiteLogo} />
            </div>
          </div>
          <div className="auth-rhs">
            <div className="auth-rhs-header d-flex justify-content-between">
              <img className="site-logo mobile-only" src={SiteLogo} />
            </div>
            <div className="auth-rhs-content d-flex align-items-center">
              <div className="rhs-inner">
                <h2>Create Password</h2>
                <div className="auth-account-wrap">
                  <form className="auth-form" onSubmit={handleSubmit}>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Security Question
                      </label>
                      <div className="form-group">
                        <select
                          className="form-control bg-light"
                          onChange={handleChange}
                          name="question_one"
                        >
                          {" "}
                          ....Please Select a security question
                          <option className="bg-light">
                            What is the name of your first pet
                          </option>
                          <option>What is the name of your bestfriend</option>
                          <option>What is the name of your favorite pet</option>
                          <option>
                            What was the name of your first girlfriend
                          </option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          name="answer_one"
                          placeholder="Answer"
                          onChange={handleChange}
                        />
                        {/* <p className="text-danger">{formErrors.answer}</p> */}
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Confirm Password
                      </label>
                      <div className="form-group">
                        <select
                          className="form-control bg-light"
                          onChange={handleChange}
                          name="question_two"
                        >
                          ....Please Select a security question
                          <option className="bg-light">
                            What is the name of your first pet
                          </option>
                          <option>
                            What is the name of your bestfriend/girlfriend
                          </option>
                          <option>What is the name of your favorite pet</option>
                          <option>
                            What was the name of your first girlfriend
                          </option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          name="answer_two"
                          placeholder="Answer"
                          onChange={handleChange}
                        />
                        {formErrors && (
                          <p className="text-danger">{formErrors}</p>
                        )}
                      </div>
                    </div>
                    {loading ? (
                      <button type="submit" className="btn btn-danger">
                        <span
                          class="spinner-border spinner-border-sm"
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

export default SecurityQuestion;
