import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Authentication.css";
import SiteLogo from "../../assets/img/logo.png";
import { axios } from "../../components/baseUrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordReset = () => {
  const [loading, setLoading] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [linkExpire, setLinkExpire] = useState("");
  const [inputType, setInputType] = useState("password");

  const [passwordInput, setPasswordInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const { token } = useParams();

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
      const { data } = await axios.post(`/auth/reset-password/${token}`, {
        password: passwordInput.password,
      });
      console.log(data);
      setPasswordInput({
        password: "",
        confirmPassword: "",
      });
      toast.success("Your Password has been changed successfully", {
        position: "top-right",
        autoClose: 2000,
        pauseHover: true,
        draggable: true,
      });
      setTimeout(() => {
        navigate(`/login`);
      }, 3800);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setLinkExpire("Your token has expired");
      alert(linkExpire);
    }
  };

  return (
    <>
      <div>
        <ToastContainer />
        <section className="auth">
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
                <h2>Reset your Password</h2>
                <p>Set a new password below for your account</p>
                <div className="auth-account-wrap">
                  <form onSubmit={handleSubmit} className="auth-form">
                    <div className="mb-3">
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
                            <i
                              className="fa fa-eye-slash mt-1 pt-1"
                              aria-hidden="true"
                            ></i>
                          ) : (
                            <i
                              className="fa fa-eye mt-1 pt-1"
                              aria-hidden="true"
                            ></i>
                          )}
                        </span>
                      </div>
                      <p className="error-message">{passwordError}</p>
                    </div>
                    <div className="mb-3">
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
                            <i
                              className="fa fa-eye-slash mt-1 pt-1"
                              aria-hidden="true"
                            ></i>
                          ) : (
                            <i
                              className="fa fa-eye mt-1 pt-1"
                              aria-hidden="true"
                            ></i>
                          )}
                        </span>
                      </div>
                      <p className="error-message">{confirmPasswordError}</p>
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

export default PasswordReset;
