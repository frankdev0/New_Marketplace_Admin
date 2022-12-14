import React, { useState } from "react";
import { Iconly } from "react-iconly";
import { axios } from "../../../components/baseUrl";
import SellersSidebar from "../dashboardComponents/SideBar";

const CreateCategories = () => {
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setCategory({ ...category, [e.traget.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const { data } = axios.post("/category", category);
      console.log("category created", data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <div className="grid-container">
          <header className="header">
            <div className="header__message">
              <h2>Create New Category</h2>
            </div>
            <div className="header__search">
              <form>
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
              </form>

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
            <div className="main-overview">
              <div className="overview-card">
                <div>
                  <form onSubmit={handleSubmit}>
                    <label>Category Name</label>
                    <input
                      className="form-control my-4"
                      placeholder="Category Name"
                      name="category"
                      onChange={handleChange}
                      value={category}
                    />
                    <button className="btn btn-dark" type="button">
                      Submit
                    </button>
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
