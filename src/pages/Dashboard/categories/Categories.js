import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Iconly } from "react-iconly";
import "../Dashboard.css";
import SellersSidebar from "../dashboardComponents/SideBar";
import { axios } from "../../../components/baseUrl";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

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
                                <button className="btn btn-danger">
                                  Delete
                                </button>
                                <Link
                                  to={`/edit-category/${category.id}`}
                                  className="btn btn-primary mx-2 px-4"
                                >
                                  Edit
                                </Link>
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
