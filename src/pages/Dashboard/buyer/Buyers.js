import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Iconly } from "react-iconly";
import SellersSidebar from "../dashboardComponents/SideBar";
import Search from "../dashboardComponents/Search";
import { axios } from "../../../components/baseUrl";

const Buyers = () => {
  const [newData, setNewData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState();
  const ITEMS_PER_PAGE = 50;

  const getData = async () => {
    try {
      axios.get("/category").then((response) => {
        setNewData(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="grid-container">
        <header className="header">
          <div className="header__message">
            <h2>Hello Erhun Abbe</h2>
          </div>
          <div className="header__search">
            <Search
              onSearch={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
            />

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
          <h1 className="section-title">Activity Summary</h1>
          <div className="row main-overview">
            <div className="col-4 overview-card">
              <div>
                <h2>Total Buyers</h2>
                {/* <p>Detailed transaction history is on the order page</p> */}
                <div class="d-flex justify-content-between mt-4">
                  <h3>10,000</h3>
                </div>
              </div>
            </div>
          </div>

          <h1 className="section-title">All Buyers</h1>
          <div className="main-overview">
            <div className="overview-card no-padding">
              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S/N</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">No of Orders</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0123456543</td>
                      <td>
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <img
                              className="table-product-img"
                              src=""
                              alt="..."
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <p>Dried Hibiscus</p>
                          </div>
                        </div>
                      </td>
                      <td>USD 40,000</td>

                      <td>Letter of Credit</td>
                      <td>
                        <div className="text-warning">Pending</div>
                      </td>
                    </tr>
                    <tr>
                      <td>0123456543</td>
                      <td>
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <img
                              className="table-product-img"
                              src=""
                              alt="..."
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <p>Dried Hibiscus</p>
                          </div>
                        </div>
                      </td>
                      <td>USD 40,000</td>

                      <td>Letter of Credit</td>
                      <td>
                        <div className="text-primary">Processing</div>
                      </td>
                    </tr>
                    <tr>
                      <td>0123456543</td>
                      <td>
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <img
                              className="table-product-img"
                              src=""
                              alt="..."
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <p>Dried Hibiscus</p>
                          </div>
                        </div>
                      </td>
                      <td>XAF 20,000,000</td>
                      <td>Letter of Credit</td>
                      <td>
                        <div className="text-success">Shipped</div>
                      </td>
                    </tr>
                    <tr>
                      <td>0123456543</td>
                      <td>
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <img
                              className="table-product-img"
                              src=""
                              alt="..."
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <p>Dried Hibiscus</p>
                          </div>
                        </div>
                      </td>
                      <td>USD 40,000</td>
                      <td>Letter of Credit</td>
                      <td>
                        <div className="text-success">Delivered</div>
                      </td>
                    </tr>
                    <tr>
                      <td>0123456543</td>
                      <td>
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <img
                              className="table-product-img"
                              src=""
                              alt="..."
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <p>Dried Hibiscus</p>
                          </div>
                        </div>
                      </td>
                      <td>USD 40,000</td>
                      <td>Letter of Credit</td>
                      <td>
                        <div className="text-success">Delivered</div>
                      </td>
                    </tr>
                    <tr>
                      <td>0123456543</td>
                      <td>
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <img
                              className="table-product-img"
                              src=""
                              alt="..."
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <p>Dried Hibiscus</p>
                          </div>
                        </div>
                      </td>
                      <td>USD 40,000</td>
                      <td>Letter of Credit</td>
                      <td>
                        <div className="text-success">Delivered</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Buyers;
