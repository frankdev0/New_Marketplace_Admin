import React, { useEffect, useState } from "react";
import { Iconly } from "react-iconly";
import { useNavigate } from "react-router-dom";
import { axios } from "../../../components/baseUrl";
import SellersSidebar from "../dashboardComponents/SideBar";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const SubCategory = () => {
  const [subCategories, setSubCategories] = useState([{ subCategory: "" }]);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setSubCategory({ ...subCategory, [e.target.name]: e.target.value });
  //   console.log(subCategory);
  // };
  const handleId = (e) => {
    setCategoryId({ ...categoryId, [e.target.name]: e.target.value });
    console.log(categoryId);
  };

  const getSubCategories = () => {
    // const keys = document.getElementsByClassName("specification-keys");
    const values = document.getElementsByClassName("specification-values");

    const subCategory = {};
    for (let i = 0; i < values.length; i++) {
      // const key = keys[i].value;
      const value = values[i].value;
      if (value) subCategory[value] = value;
    }
    return JSON.stringify(subCategory);
  };

  const handleInput = (index, event) => {
    const values = [...subCategories];
    values[index][event.target.name] = event.target.value;
    setSubCategories(values);
  };

  const handleAddFields = () => {
    setSubCategories([...subCategories, { subCategory: "" }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...subCategories];
    if (values.length > 1) {
      values.splice(index, 1);
      setSubCategories(values);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newData = {
        subCategory: getSubCategories(),
        categoryId: categoryId.categoryId,
      };
      console.log("sub category values", newData);
      const { data } = await axios.post("/sub-category", newData);
      console.log("category created", data);
      setTimeout(() => {
        navigate("/categories");
      }, 2000);
      toast.success("SUCCESSFULLY CREATED SUBCATEGORY", {
        position: "top-right",
        autoClose: 4000,
        pauseHover: true,
        draggable: true,
      });
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
          <ToastContainer />
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
                    <label>Category Name</label>

                    <select
                      className="form-control my-2"
                      name="categoryId"
                      onChange={handleId}
                      //   onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option defaultValue={true}>...Select Category</option>
                      {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                          {category.category}
                        </option>
                      ))}
                    </select>

                    <label>Sub Category</label>

                    {subCategories.map((subCategory, index) => (
                      <div key={index} className="root my-2 d-flex">
                        <input
                          type="text"
                          name="subCategory"
                          value={subCategory.subCategory}
                          onChange={(event) => handleInput(index, event)}
                          placeholder="type"
                          className="mx-1 form-control specification-values"
                        />

                        <div className="d-flex align-items-center">
                          <i
                            className="fa-solid fa-plus mx-1 "
                            onClick={() => handleAddFields()}
                          ></i>
                          <i
                            className="fa-solid fa-minus mx-1"
                            onClick={() => handleRemoveFields(index)}
                          ></i>
                        </div>
                      </div>
                    ))}
                    {/* <input
                      className="form-control my-2"
                      placeholder="Category Name"
                      name="subCategory"
                      type="text"
                      onChange={handleChange}
                    /> */}
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
