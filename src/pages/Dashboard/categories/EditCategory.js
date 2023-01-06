import React, { useEffect, useState } from "react";
import { Iconly } from "react-iconly";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axios } from "../../../components/baseUrl";
import SellersSidebar from "../dashboardComponents/SideBar";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const EditCategory = () => {
  const [category, setCategory] = useState(null);
  const [id, setId] = useState("");

  const navigate = useNavigate();

  const { categoryId } = useParams();
  console.log(categoryId);

  const getCategory = async () => {
    try {
      const response = await axios.get(`/category/${categoryId}`);
      setCategory(response.data.data.category);
      setId(response.data.data.id);
      console.log(response.data.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.patch(`/category/${id}`, category);
      console.log("category created", data);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
      toast.success("UPDATED SUCCESSFULLY", {
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
            {/* <div style={{ display: "flex", justifyContent: "right" }}>
              <Link to="/sub-category" className="my-3">
                {" "}
                <small>
                  <u>Create Sub-Category </u>
                </small>
              </Link>
            </div> */}
            <div className="main-overview">
              <div className="overview-card">
                <div>
                  <form onSubmit={handleUpdate}>
                    <div>
                      <label>Category Name</label>
                      <input
                        className="form-control my-4"
                        type="text"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
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

export default EditCategory;
