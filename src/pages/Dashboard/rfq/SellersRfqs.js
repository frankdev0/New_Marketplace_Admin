import React, { useEffect, useState } from "react";
import { Iconly } from "react-iconly";
import { Link } from "react-router-dom";
import { axios } from "../../../components/baseUrl";
import SellersSidebar from "../dashboardComponents/SideBar";

const SellersRfqs = () => {
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRfqs = async () => {
    try {
      axios.get("/rfqs").then((response) => {
        setRfqs(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRfqs();
  }, []);

  return (
    <>
      <div>
        <div className="grid-container">
          <header className="header">
            <div className="header__message">
              <h2>My RFQs</h2>
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
                  <h2>Total RFQ</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div class="d-flex justify-content-between mt-4">
                    <h3>10</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Open RFQ</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div class="d-flex justify-content-between mt-4">
                    <h3>22</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Processing RFQ</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div class="d-flex justify-content-between mt-4">
                    <h3>5</h3>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="section-title">Latest Orders</h1>
            <div className="main-overview">
              <div className="overview-card no-padding">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Order No</th>
                        <th scope="col">Product Info</th>
                        <th scope="col">Product Cost</th>
                        <th scope="col">Shipping Terms</th>
                        <th scope="col">Payment Terms</th>
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
                        <td>Letter of Credit</td>
                        <td>
                          <div className="text-warning">Pending</div>
                        </td>
                        <td>
                          <Link to="/view-rfq">view</Link>
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
                        <td>Letter of Credit</td>
                        <td>
                          <div className="text-primary">Processing</div>
                        </td>
                        <td>
                          <Link to="/view-rfq">view</Link>
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
                        <td>Letter of Credit</td>
                        <td>
                          <div className="text-success">Shipped</div>
                        </td>
                        <td>
                          <Link to="/view-rfq">view</Link>
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
                        <td>Letter of Credit</td>
                        <td>
                          <div className="text-success">Delivered</div>
                        </td>
                        <td>
                          <Link to="/view-rfq">view</Link>
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
                        <td>Letter of Credit</td>
                        <td>
                          <div className="text-success">Delivered</div>
                        </td>
                        <td>
                          <Link to="/view-rfq">view</Link>
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
                        <td>Letter of Credit</td>
                        <td>
                          <div className="text-success">Delivered</div>
                        </td>
                        <td>
                          <Link to="/view-rfq">view</Link>
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

export default SellersRfqs;
