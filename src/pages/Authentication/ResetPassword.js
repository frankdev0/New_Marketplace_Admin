import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Iconly } from "react-iconly";
import "./Authentication.css";
import SiteLogo from "../../assets/img/logo.png";
import { axios } from "../../components/baseUrl.jsx";

import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  console.log(token);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [linkExpire, setLinkExpire] = useState("");
  const [inputType, setInputType] = useState("password");
  const [confirmInputType, setConfirmInputType] = useState("password");
  const [passwordInput, setPasswordInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const { userID, token } = useParams();

  console.log("my user Id", userID);
  console.log("my TOKEN", token);

  const handlePasswordChange = (evnt) => {
    const passwordInputValue = evnt.target.value.trim();
    const passwordInputFieldName = evnt.target.name;
    const NewPasswordInput = {
      ...passwordInput,
      [passwordInputFieldName]: passwordInputValue,
    };
    setPasswordInput(NewPasswordInput);
  };

  const handlePasswordToggle = (e) => {
    inputType === "password" ? setInputType("text") : setInputType("password");
  };
  const handleConfirmPasswordToggle = (e) => {
    confirmInputType === "password"
      ? setConfirmInputType("text")
      : setConfirmInputType("password");
  };
  const navigate = useNavigate();
  const handleValidation = (evnt) => {
    const passwordInputValue = evnt.target.value.trim();
    const passwordInputFieldName = evnt.target.name;
    //for password
    if (passwordInputFieldName === "password") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{6,}/;
      const passwordLength = passwordInputValue.length;
      const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
      const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      const digitsPassword = digitsRegExp.test(passwordInputValue);
      const specialCharPassword = specialCharRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);
      let errMsg = "";
      if (passwordLength === 0) {
        errMsg = "Password is empty";
      } else if (!uppercasePassword) {
        errMsg = "At least one Uppercase";
      } else if (!lowercasePassword) {
        errMsg = "At least one Lowercase";
      } else if (!digitsPassword) {
        errMsg = "At least one digit";
      } else if (!specialCharPassword) {
        errMsg = "At least one Special Characters";
      } else if (!minLengthPassword) {
        errMsg = "At least minumum 6 characters";
      } else {
        errMsg = "";
      }
      setPasswordError(errMsg);
    }
    // for confirm password
    if (
      passwordInputFieldName === "confirmPassword" ||
      (passwordInputFieldName === "password" &&
        passwordInput.confirmPassword.length > 0)
    ) {
      if (passwordInput.confirmPassword !== passwordInput.password) {
        setConfirmPasswordError("Confirm password is not match");
      } else {
        setConfirmPasswordError("");
      }
    }
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (passwordInput.confirmPassword !== passwordInput.password) {
      setConfirmPasswordError("Confirm password is not a match");
    }
    try {
      // const changePassword = {
      //   password: passwordInput.password,
      // };
      console.log(passwordInput.password);
      const { data } = await axios.post("/auth/new-user-resetpassword", {
        userID,
        token,
        password: passwordInput.password,
      });
      console.log(data);
      setPasswordInput({
        password: "",
        confirmPassword: "",
      });
      Store.addNotification({
        title: "Successful!",
        message: `Your Password has been changed successfully`,
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
      setTimeout(() => {
        navigate(`/login`);
      }, 3800);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setLinkExpire("Your token has expired");
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
              <p>
                <Link>
                  <Iconly
                    className="support-icon me-2"
                    name="InfoCircle"
                    set="light"
                    size="medium"
                  />
                  Customer Support
                </Link>
              </p>
            </div>
            <div className="auth-rhs-content d-flex align-items-center">
              <div className="rhs-inner">
                <h2>Reset your Password</h2>
                <p>Set a new password below for your account</p>
                <div className="auth-account-wrap">
                  <form onSubmit={handleSubmit} className="auth-form">
                    <div class="mb-3">
                      <label for="exampleInputPassword1" className="form-label">
                        New Password
                      </label>
                      <div className="form-control passwordToggle">
                        <input
                          type={inputType}
                          id="exampleInputPassword1"
                          name="password"
                          value={passwordInput.password}
                          onChange={handlePasswordChange}
                          onKeyUp={handleValidation}
                        />
                        <span
                          className={"password-icon"}
                          onClick={handlePasswordToggle}
                        >
                          {inputType === "password" ? (
                            <Iconly
                              className="mt-1 pt-1"
                              name="Hide"
                              set="light"
                              size="medium"
                              color="#5C5C5C"
                            />
                          ) : (
                            <Iconly
                              className="mt-1 pt-1"
                              name="Show"
                              set="light"
                              size="medium"
                              color="#5C5C5C"
                            />
                          )}
                        </span>
                      </div>
                      <p className="error-message">{passwordError}</p>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" className="form-label">
                        Confirm New Password
                      </label>
                      <div className="form-control passwordToggle">
                        <input
                          type={inputType}
                          id="exampleInputPassword1"
                          name="confirmPassword"
                          value={passwordInput.confirmPassword}
                          onChange={handlePasswordChange}
                          onKeyUp={handleValidation}
                        />
                        <span
                          className={"password-icon"}
                          onClick={handlePasswordToggle}
                        >
                          {inputType === "password" ? (
                            <Iconly
                              className="mt-1 pt-1"
                              name="Hide"
                              set="light"
                              size="medium"
                              color="#5C5C5C"
                            />
                          ) : (
                            <Iconly
                              className="mt-1 pt-1"
                              name="Show"
                              set="light"
                              size="medium"
                              color="#5C5C5C"
                            />
                          )}
                        </span>
                      </div>
                      <p className="error-message">{confirmPasswordError}</p>
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
                        Reset Password
                      </button>
                    )}
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

export default ResetPassword;
