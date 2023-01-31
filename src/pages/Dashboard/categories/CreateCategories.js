import React, { useState } from "react";
import { Iconly } from "react-iconly";
import { Link, useNavigate } from "react-router-dom";
import { axios } from "../../../components/baseUrl";
import SellersSidebar from "../dashboardComponents/SideBar";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

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
      Store.addNotification({
        title: "Successful!",
        message: `successfully created Category`,
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
    } catch (error) {
      setLoading(false);
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
