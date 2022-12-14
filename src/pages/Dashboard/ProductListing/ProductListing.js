import React from "react";
import { Iconly } from "react-iconly";
import { Link } from "react-router-dom";
import SellersSidebar from "../dashboardComponents/SideBar";
import "./productlisting.css";

const ProductListing = () => {
  return (
    <>
      <div>
        <div className="grid-container">
          <header className="header">
            <div className="header__message">
              <h2>All Products</h2>
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
            <h1 className="section-title">Activity Summary</h1>
            <div className="main-overview">
              <div className="overview-card">
                <div>
                  <h2>Total Products</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div class="d-flex justify-content-between mt-4">
                    <h3>10</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Total Approved Products</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div class="d-flex justify-content-between mt-4">
                    <h3>22</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Total Pending Products</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div class="d-flex justify-content-between mt-4">
                    <h3>5</h3>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="section-title">Latest Products</h1>
            <div className="main-overview">
              <div className="overview-card no-padding">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">S/N</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Sellers Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Status</th>
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
                        <td>FOB</td>
                        <td>
                          <div className="text-danger">Declined</div>
                        </td>
                        <td>
                          <Link to="/view-product">view</Link>
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
                        <td>CIF</td>
                        <td>
                          <div className="text-danger">Declined</div>
                        </td>
                        <td>
                          <Link to="/view-product">view</Link>
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
                        <td>Local Delivery</td>
                        <td>
                          <div className="text-success">Approved</div>
                        </td>
                        <td>
                          <Link to="/view-product">view</Link>
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
                        <td>CFR</td>
                        <td>
                          <div className="text-success">Approved</div>
                        </td>
                        <td>
                          <Link to="/view-product">view</Link>
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
                        <td>CFR</td>
                        <td>
                          <div className="text-warning">Under-review</div>
                        </td>
                        <td>
                          <Link to="/view-product">view</Link>
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
                        <td>CFR</td>
                        <td>
                          <div className="text-success">Approved</div>
                        </td>
                        <td>
                          <Link to="/view-product">view</Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProductListing;
