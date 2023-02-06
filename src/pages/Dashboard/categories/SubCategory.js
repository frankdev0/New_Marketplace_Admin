import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axios } from "../../../components/baseUrl";
import SellersSidebar from "../dashboardComponents/SideBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubCategory = () => {
  const [subCategory, setSubCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSubCategory({ ...subCategory, [e.target.name]: e.target.value });
  };
  const handleId = (e) => {
    setCategoryId({ ...categoryId, [e.target.name]: e.target.value });
    console.log(categoryId);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const newData = {
        subCategory: subCategory.subCategory,
        categoryId: categoryId.categoryId,
      };
      console.log("sub category values", newData);
      const { data } = await axios.post("/sub-category", newData);
      console.log("category created", data);
      setLoading(false);
      setTimeout(() => {
        navigate("/categories");
      }, 2000);
      toast.success("successfully created Subcategory", {
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

  const getCategory = async () => {
    try {
      axios.get("/category").then((response) => {
        console.log(response.data.data);
        setCategories(response.data.data);
        // setLoading(true);
      });
    } catch (error) {
      console.log(error.response.data.erros);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
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
            <div className="main-overview">
              <div className="overview-card">
                <div>
                  <form>
                    <label>Category Name</label>

                    <select
                      className="form-control my-2"
                      name="categoryId"
                      onChange={handleId}
                    >
                      <option defaultValue={true}>...Select Category</option>
                      {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                          {category.category}
                        </option>
                      ))}
                    </select>

                    <label>Sub Category</label>

                    <div className="root my-2 d-flex">
                      <input
                        type="text"
                        name="subCategory"
                        onChange={handleChange}
                        placeholder="type"
                        className="mx-1 form-control specification-values"
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
                      <button
                        className="btn btn-dark"
                        type="button"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    )}
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

export default SubCategory;
