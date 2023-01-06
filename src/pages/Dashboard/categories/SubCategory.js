import React, { useEffect, useState } from "react";
import { Iconly } from "react-iconly";
import { axios } from "../../../components/baseUrl";
import SellersSidebar from "../dashboardComponents/SideBar";

const SubCategory = () => {
  const [subCategory, setSubCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    setSubCategory({ ...subCategory, [e.target.name]: e.target.value });
    console.log(subCategory);
  };
  const handleId = (e) => {
    setCategoryId({ ...categoryId, [e.target.name]: e.target.value });
    console.log(categoryId);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newData = {
        subCategory: subCategory.subCategory,
        categoryId: categoryId.categoryId,
      };
      console.log("sub category values", newData);
      //   console.log("category Id", categoryId);
      const { data } = await axios.post("/sub-category", newData);
      console.log("category created", data);
    } catch (error) {
      console.log(error);
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
                  <form>
                    <label>Subcategory Name</label>

                    <select
                      className="form-control my-4"
                      name="categoryId"
                      onChange={handleId}
                      //   onChange={(e) => setCategoryId(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                          {category.category}
                        </option>
                      ))}
                    </select>

                    <label>Category Name</label>
                    <input
                      className="form-control my-4"
                      placeholder="Category Name"
                      name="subCategory"
                      type="text"
                      onChange={handleChange}
                      //   value={subCategory.subCategory}
                    />
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={handleSubmit}
                    >
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

export default SubCategory;
