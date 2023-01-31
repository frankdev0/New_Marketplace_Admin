import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Iconly } from "react-iconly";
import "../Dashboard.css";
import SellersSidebar from "../dashboardComponents/SideBar";
import { axios } from "../../../components/baseUrl";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { AppContext } from "../../../components/AppState";
import { ProtectedRoutes } from "../../../components/ProtectedRoutes";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewLoader, setViewLoader] = useState(false);
  const [viewCategory, setViewCategory] = useState([]);

  const { user, activitySummary } = useContext(AppContext);

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

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`/category/${categoryId}`).then((response) => {
        console.log(response);
      });
    } catch (error) {
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
        <ReactNotifications />
        <header className="header">
          <div className="header__message">
            <h2>
              Hello {user.firstName} {user.LastName}
            </h2>
          </div>
          <div className="header__search">
            <Link to="/create-category">
              <button className="btn btn-dark"> Create Category</button>
            </Link>
          </div>
        </header>

        <SellersSidebar />

        <main className="main">
          <h1 className="section-title">Activity Summary</h1>
          <div className="main-overview">
            {/* <div className="overview-card">
              <div>
                <h2>Total Buyers</h2>

                <div className="d-flex justify-content-between mt-4">
                  <h3>120</h3>
                </div>
              </div>
            </div> */}
            <div className="overview-card">
              <div>
                <h2>All Categories</h2>
                <div className="d-flex justify-content-between mt-4">
                  <h3>{activitySummary.total_categories}</h3>
                </div>
              </div>
            </div>
            <div className="overview-card">
              <div>
                <h2>Total Sub Categories</h2>
                <div className="d-flex justify-content-between mt-4">
                  <h3>{activitySummary.total_sub_categories}</h3>
                </div>
              </div>
            </div>
          </div>

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
                      <th className="text-center">Link</th>

                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories &&
                      categories.map((category, index) => {
                        return (
                          <tr key={category.id}>
                            <td>{index + 1}</td>

                            <td className="text-center">{category.category}</td>
                            <td className="text-center">
                              <div className="sub-category-role">
                                <Link to={`/sub-category/${category.id}`}>
                                  create sub-category
                                </Link>
                              </div>
                            </td>
                            <td className="text-center">
                              <div className="nav-item dropdown">
                                <Link
                                  className="nav-link main-nav-link "
                                  align="center"
                                  to="#"
                                  id="navbarDropdown"
                                  role="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i
                                    className="fa fa-chevron-down"
                                    align="right"
                                    aria-hidden="true"
                                  ></i>
                                </Link>
                                <ul
                                  className="dropdown-menu animate slideIn category-dropdown-item"
                                  aria-labelledby="navbarDropdown"
                                  style={{
                                    width: "50px !important",
                                    textAlign: "center",
                                  }}
                                >
                                  <li>
                                    <div
                                      onClick={(e) => showCategory(category.id)}
                                      className="dropdown-item"
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal"
                                    >
                                      View
                                    </div>
                                  </li>
                                  <li>
                                    <Link
                                      to={`/edit-category/${category.id}`}
                                      className=" dropdown-item"
                                    >
                                      Edit
                                    </Link>
                                  </li>
                                  <li>
                                    <div
                                      className="dropdown-item text-danger"
                                      onClick={(e) => submit(category.id)}
                                    >
                                      Delete
                                    </div>
                                  </li>
                                </ul>
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
                                      <div className="modal-body d-flex mx-2">
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

export default ProtectedRoutes(Categories);
