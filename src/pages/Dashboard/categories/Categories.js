import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Iconly } from "react-iconly";
import "../Dashboard.css";
import SellersSidebar from "../dashboardComponents/SideBar";
import { axios } from "../../../components/baseUrl";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewLoader, setViewLoader] = useState(false);
  const [viewCategory, setViewCategory] = useState([]);

  const getCategory = async () => {
    try {
      axios.get("/category").then((response) => {
        console.log(response.data.data);
        setCategories(response.data.data);
        setLoading(true);
        // setLoading(true);
      });
    } catch (error) {
      console.log(error.response.data.erros);
      setLoading(true);
    }
  };

  const handleDelete = (categoryId) => {
    axios.delete(`/category/${categoryId}`).then(() => {
      getCategory();
    });
  };

  const showCategory = (categoryId) => {
    setViewLoader(true);
    axios.get(`/category/${categoryId}`).then((response) => {
      setViewCategory(response.data.data);
      console.log(response.data.data);
      setViewLoader(false);
    });
  };

  const submit = (categoryId) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: (e) => handleDelete(categoryId),
        },
        {
          label: "No",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  useEffect(() => {
    getCategory();
  }, []);

  if (!loading) {
    return (
      <div
        className="spinner mx-auto"
        align="center"
        id="spinner"
        style={{
          position: "absolute",
          top: "calc(50% - 60px)",
          left: "calc(50% - 60px)",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          margin: "auto",
        }}
      ></div>
    );
  }

  return (
    <div>
      <div className="grid-container">
        <header className="header">
          <div className="header__message">
            <h2>Hello Erhun Abbe</h2>
          </div>
          <div className="header__search">
            <Link to="/create-category">
              <button className="btn btn-dark"> Create Category</button>
            </Link>
          </div>
        </header>

        <SellersSidebar />

        <main className="main">
          <h1 className="section-title">All Categories</h1>
          <div className="main-overview">
            <div className="overview-card no-padding">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S/N</th>
                      <th scope="col" className="text-center">
                        Category Name
                      </th>

                      <th scope="col" className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories &&
                      categories.map((category, index) => {
                        return (
                          <tr key={category.id}>
                            <td scope="row">{index + 1}</td>

                            <td className="text-center">{category.category}</td>
                            <td>
                              <div className="text-center">
                                <button
                                  className="btn btn-danger"
                                  onClick={(e) => submit(category.id)}
                                >
                                  Delete
                                </button>
                                <Link
                                  to={`/edit-category/${category.id}`}
                                  className="btn btn-secondary mx-2 px-4"
                                >
                                  Edit
                                </Link>
                                <button
                                  onClick={(e) => showCategory(category.id)}
                                  className="btn btn-dark px-4"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                >
                                  View
                                </button>
                              </div>
                              <div
                                className="modal fade p-relative"
                                id="exampleModal"
                                tabIndex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                              >
                                {viewLoader ? (
                                  <div
                                    className="spinner mx-auto"
                                    align="center"
                                    id="spinner"
                                    style={{
                                      position: "absolute",
                                      top: "calc(50% - 60px)",
                                      left: "calc(50% - 60px)",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      textAlign: "center",
                                      margin: "auto",
                                    }}
                                  ></div>
                                ) : (
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title"
                                          id="exampleModalLabel"
                                        >
                                          Category
                                        </h5>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div className="modal-body">
                                        Category: {viewCategory.category}
                                      </div>
                                      <div className="modal-body d-flex mx-2">
                                        Sub Categories:
                                        <div className="mx-2">
                                          {viewCategory.subCategories &&
                                            viewCategory.subCategories.map(
                                              (category, index) => {
                                                return (
                                                  <div key={category.id}>
                                                    {index + 1}{" "}
                                                    {category.subCategory}
                                                  </div>
                                                );
                                              }
                                            )}
                                        </div>
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          data-bs-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Categories;
