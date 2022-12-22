import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Iconly } from "react-iconly";
import "../Dashboard.css";
import SellersSidebar from "../dashboardComponents/SideBar";
import { axios } from "../../../components/baseUrl";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

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
  const getUsers = async () => {
    try {
      axios.get("/auth/current-user").then((response) => {
        console.log(response.data);
        setUsers(response.data.data);
        // setLoading(true);
      });
    } catch (error) {
      console.log(error.response.data.erros);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getCategory();
  }, []);

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
                      <th scope="col">Category Name</th>

                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories &&
                      categories.map((category, index) => {
                        return (
                          <tr key={category.id}>
                            <td scope="row">{index + 1}</td>

                            <td>
                              <div className="text-warning">
                                {category.category}
                              </div>
                            </td>
                            <td>view</td>
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
