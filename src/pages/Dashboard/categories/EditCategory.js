import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axios } from "../../../components/baseUrl";
import SellersSidebar from "../dashboardComponents/SideBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCategory = () => {
  const [category, setCategory] = useState("");
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { categoryId } = useParams();

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
    setLoading(true);
    try {
      e.preventDefault();
      console.log(category);
      const { data } = await axios.patch(`/category/${id}`, {
        category: category,
      });
      setLoading(false);
      console.log("category created", data);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
      toast.success("Successfully Edited Category", {
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
              <div className="notify-wrap position-relative">
                <i className="fa fa-bell" aria-hidden="true"></i>
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
                  <form onSubmit={handleUpdate}>
                    <div>
                      <label>Category Name</label>
                      <input
                        className="form-control my-4"
                        type="text"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                      />

                      {loading ? (
                        <button type="submit" className="btn btn-dark">
                          <span
                            className="spinner-border spinner-border-sm mx-4"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        </button>
                      ) : (
                        <button className="btn btn-dark">Submit</button>
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

export default EditCategory;
