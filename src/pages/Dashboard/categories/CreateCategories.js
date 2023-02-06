import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axios } from "../../../components/baseUrl";
import SellersSidebar from "../dashboardComponents/SideBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCategories = () => {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState();
  const [icon, setIcon] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      const jsonData = {
        categoryName: category.categoryName,
      };
      console.log("jsonData", jsonData);
      const formData = new FormData();
      for (const property in jsonData) {
        formData.append(`${property}`, jsonData[property]);
      }
      console.log("image", image);
      console.log("icon", icon);
      formData.append("image", image);
      formData.append("icon", icon);

      e.preventDefault();
      const { data } = await axios.post("/category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      console.log("category created", data);
      setTimeout(() => {
        navigate("/sub-category");
      }, 2000);
      toast.success("successfully created Category", {
        position: "top-right",
        autoClose: 2000,
        pauseHover: true,
        draggable: true,
      });
    } catch (error) {
      setLoading(false);
      toast.error(`${error.response.data.errors[0].message}`, {
        position: "top-right",
        autoClose: 4000,
        pauseHover: true,
        draggable: true,
      });
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
                <i className="fa fa-bell" aria-hidden="true"></i>
                {/* <Iconly
                  name="Notification"
                  set="bulk"
                  primaryColor="#282828"
                  size="medium"
                /> */}
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
                        name="categoryName"
                        onChange={handleChange}
                      />
                      <div>
                        <input
                          name="iamge"
                          onChange={(e) => setImage(e.target.files[0])}
                          type="file"
                        />
                      </div>
                      <div>
                        <input
                          name="icon"
                          onChange={(e) => setIcon(e.target.files[0])}
                          type="file"
                        />
                      </div>
                      {loading ? (
                        <button type="submit" className="btn btn-dark">
                          <span
                            className="spinner-border spinner-border-sm mx-4"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        </button>
                      ) : (
                        <button className="btn btn-dark" type="submit">
                          Submit
                        </button>
                      )}
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
