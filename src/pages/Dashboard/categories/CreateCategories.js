import React, { useState } from "react";
import { Iconly } from "react-iconly";
import { Link, useNavigate } from "react-router-dom";
import { axios } from "../../../components/baseUrl";
import SellersSidebar from "../dashboardComponents/SideBar";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const CreateCategories = () => {
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("category", category);
    try {
      e.preventDefault();
      const { data } = await axios.post("/category", {
        categoryName: category,
      });
      console.log("category created", data);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
      toast.success("SUCCESSFULLY CREATED CATEGORY", {
        position: "top-right",
        autoClose: 4000,
        pauseHover: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <div className="grid-container">
          <ToastContainer />
          <header className="header">
            <div className="header__message">
              <h2>Create New Category</h2>
            </div>
            <div className="header__search">
              {/* <form>
                <div className="custom__search">
                  <Iconly
                    name="Search"
                    set="light"
                    primaryColor="#5C5C5C"
                    size="medium"
                  />
                  <input
                    type="text"
                    className="form-control custom-style"
                    id=""
                    placeholder="Search for orders, inquiries and more"
                  />
                </div>
              </form> */}

              <div className="notify-wrap position-relative">
                <Iconly
                  name="Notification"
                  set="bulk"
                  primaryColor="#282828"
                  size="medium"
                />
                <span className="seller icon-notification position-absolute"></span>
              </div>
            </div>
          </header>

          <SellersSidebar />

          <main className="main">
            <div style={{ display: "flex", justifyContent: "right" }}>
              <Link to="/sub-category" className="my-3">
                {" "}
                <small>
                  <u>Create Sub-Category </u>
                </small>
              </Link>
            </div>
            <div className="main-overview">
              <div className="overview-card">
                <div>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label>Category Name</label>
                      <input
                        className="form-control my-4"
                        placeholder="Category Name"
                        name="category"
                        onChange={handleChange}
                      />

                      <button className="btn btn-dark">Submit</button>
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

export default CreateCategories;
