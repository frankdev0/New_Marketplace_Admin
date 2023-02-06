import React, { useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Authentication.css";
import { axios } from "../../components/baseUrl";
import SiteLogo from "../../assets/img/logo.png";
import swal from "sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [inputType, setInputType] = useState("password");
  const { userId, token } = useParams();
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });

  const handlePasswordToggle = (e) => {
    inputType === "password" ? setInputType("text") : setInputType("password");
  };

  useMemo(() => {
    (async () => {
      if (userId && token) {
        const data = await axios.post("/auth/verify-email", {
          userId,
          token,
        });
        console.log("dataaa", data);
        toast.success("Your email has been successfully verified", {
          position: "top-right",
          autoClose: 2000,
          pauseHover: true,
          draggable: true,
        });
      }
    })();
  }, []);

  const handleChange = (e) => {
    setLoginDetail({ ...loginDetail, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const loginDetails = {
        email: loginDetail.email,
        password: loginDetail.password,
      };
      console.log("my login details", loginDetails);
      const {
        data: { data },
      } = await axios.post("/auth/signin-user", loginDetails);

      // setUser(data);
      console.log("data", data);
      localStorage.setItem("user", true);
      if (data) {
        swal({
          title: "Login Successful",
          text: "You've Successfully Logged In",
          icon: "success",
          button: "ok",
        });
        navigate("/overview");
      }

      // navigate("/");
    } catch (err) {
      setLoading(false);
      localStorage.setItem("user", false);
      if (!err.response.data.errors) {
        toast.error("Network Error, Please Try Again Later.", {
          position: "top-right",
          autoClose: 4000,
          pauseHover: true,
          draggable: true,
        });
      }
      if (err.response.data.errors[0].field) {
        setError(
          err.response.data.errors.reduce(function (obj, err) {
            obj[err.field] = err.message;
            return obj;
          }, {})
        );
        console.log(err.response.data.errors);
      } else {
        setError(err.response.data.errors[0]);
      }
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
            {/* <div className="auth-rhs-header d-flex justify-content-between">
              <img className="site-logo mobile-only" src={SiteLogo} />
              <p>
                Don't have an account?{" "}
                <Link to="/authentication" className="user-link">
                  Register
                </Link>
              </p>
            </div> */}
            <div className="auth-rhs-content d-flex align-items-center">
              <div className="rhs-inner">
                <h2 className="mb-4">Login to continue</h2>
                <div className="auth-account-wrap">
                  <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email"
                        value={loginDetail.email}
                        onChange={handleChange}
                      />
                      <p className="errors">{error.email}</p>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Password
                      </label>
                      <div className="form-control passwordToggle">
                        <input
                          type={inputType}
                          id="exampleInputPassword1"
                          name="password"
                          value={loginDetail.password}
                          onChange={handleChange}
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
                      <p className="errors">{error.password}</p>
                      <p className="errors">{error.message}</p>
                    </div>
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <div className="d-flex justify-content-between">
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Remember me
                        </label>
                        <span className="forgot-pwd">
                          <Link to="/forgot-password" className="user-link-doc">
                            Forgot Password?
                          </Link>
                        </span>
                      </div>
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
                        Login
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

export default Login;
