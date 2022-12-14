import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Iconly } from "react-iconly";
import "./Authentication.css";
import SiteLogo from "../../assets/img/logo.png";
import { axios } from "../../components/baseUrl.jsx";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const SellersRegistration = () => {
  const [sellerRegisterDetail, setSellerRegisterDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [phoneValue, setPhoneValue] = useState("");
  const [formattedErrors, setFormattedErrors] = useState({});
  const [customError, setCustomError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [inputType, setInputType] = useState("password");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSellerRegisterDetail({
      ...sellerRegisterDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidation = (evnt) => {
    const passwordInputValue = evnt.target.value.trim();
    const passwordInputFieldName = evnt.target.name;
    //for password
    if (passwordInputFieldName === "password") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{8,}/;
      const passwordLength = passwordInputValue.length;
      const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
      const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      const digitsPassword = digitsRegExp.test(passwordInputValue);
      const specialCharPassword = specialCharRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);
      let errMsg = "";
      if (!uppercasePassword) {
        errMsg = "At least one uppercase";
      } else if (!lowercasePassword) {
        errMsg = "At least one lowercase";
      } else if (!digitsPassword) {
        errMsg = "At least one digit";
      } else if (!specialCharPassword) {
        errMsg = "At least one special character";
      } else if (!minLengthPassword) {
        errMsg = "password should not be 8 characters ";
      } else {
        errMsg = "";
      }
      setPasswordError(errMsg);
    }
  };
  const handlePasswordToggle = (e) => {
    inputType === "password" ? setInputType("text") : setInputType("password");
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      console.log(sellerRegisterDetail);
      console.log(phoneValue);
      const sellerRegistration = {
        firstName: sellerRegisterDetail.firstName,
        LastName: sellerRegisterDetail.lastName,
        email: sellerRegisterDetail.email,
        phoneNumber: phoneValue,
        role: "SELLER",
        password: sellerRegisterDetail.password,
      };
      const {
        data: { data },
      } = await axios.post(`/auth/register-user`, sellerRegistration);

      console.log(data);
      navigate(`/verify-email/${data.email}`);
    } catch (error) {
      setLoading(false);
      if (error.response.data.errors[0].field) {
        console.log(error.response.data.errors);
        setFormattedErrors(
          error.response.data.errors.reduce(function(obj, err) {
            obj[err.field] = err.message;
            return obj;
          }, {})
        );
      } else {
        console.log(error.response.data.errors[0].message);
        setCustomError(error.response.data.errors[0].message);
      }

      console.log(error.response.data.errors);
    }
  };

  useEffect(() => {}, [formattedErrors]);
  return (
    <>
      <div>
        <section className="auth">
          <div className="auth-lhs">
            <div className="auth-lhs-header">
              <img className="site-logo" src={SiteLogo} />
            </div>
          </div>
          <div className="auth-rhs">
            <div className="auth-rhs-header d-flex justify-content-between">
              <img className="site-logo mobile-only" src={SiteLogo} />
              <p>
                Already have an account?{" "}
                <Link to="/login" className="user-link">
                  Login
                </Link>
              </p>
            </div>
            <div className="auth-rhs-content d-flex align-items-center">
              <div className="rhs-inner">
                <h2>Register as a Seller</h2>
                <p>You are a few steps away from creating your account</p>
                <div className="auth-account-wrap">
                  <form className="auth-form">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="firstName"
                        value={sellerRegisterDetail.firstName}
                        onChange={handleChange}
                      />
                      {formattedErrors.firstName && (
                        <p className="errors">{formattedErrors.firstName}</p>
                      )}
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="lastName"
                        value={sellerRegisterDetail.lastName}
                        onChange={handleChange}
                      />
                      {formattedErrors.LastName && (
                        <p className="errors">{formattedErrors.LastName}</p>
                      )}
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email"
                        value={sellerRegisterDetail.email}
                        onChange={handleChange}
                      />
                      {formattedErrors.email && (
                        <p className="errors">{formattedErrors.email}</p>
                      )}
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Phone number
                      </label>
                      <PhoneInput
                        onChange={setPhoneValue}
                        value={phoneValue}
                        name="phoneValue"
                        className="form-control"
                        defaultCountry="NG"
                      />
                      {formattedErrors.phoneNumber && (
                        <p className="errors">{formattedErrors.phoneNumber}</p>
                      )}
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" className="form-label">
                        Password
                      </label>
                      <div className="form-control passwordToggle">
                        <input
                          type={inputType}
                          id="exampleInputPassword1"
                          name="password"
                          value={sellerRegisterDetail.password}
                          onChange={handleChange}
                          onKeyUp={handleValidation}
                          required
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
                        How did you hear about us?
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    {customError && (
                      <p className="errors">User already exist</p>
                    )}
                    <div class="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input custom-checkbox"
                        id="exampleCheck1"
                        required
                      />
                      <label className="form-check-label" for="exampleCheck1">
                        I agree to the{" "}
                        <Link className="user-link-doc">
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link className="user-link-doc">Privacy Policy</Link>
                      </label>
                    </div>
                    <Link to="/phone-verification">
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
                          Signup
                        </button>
                      )}
                    </Link>
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

export default SellersRegistration;
