import React, { useEffect, useState } from "react";
import { Iconly } from "react-iconly";
import { axios } from "../../../components/baseUrl";
import SellersSidebar from "../dashboardComponents/SideBar";

const Sellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSellers = async () => {
    try {
      axios.get("/sellers").then((response) => {
        setSellers(response.data.data);
        console.log(response.data.data);
        setLoading(true);
      });
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };
  useEffect(() => {
    getSellers();
  }, []);
  return (
    <>
      <div className="grid-container">
        <header className="header">
          <div className="header__message">
            <h2>Hello Erhun Abbe</h2>
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
          <div className="row main-overview">
            <div className="col-4 overview-card">
              <div>
                <h2>Total Sellers</h2>
                {/* <p>Detailed transaction history is on the order page</p> */}
                <div class="d-flex justify-content-between mt-4">
                  <h3>10,000</h3>
                </div>
              </div>
            </div>
          </div>

          <h1 className="section-title">All Sellers</h1>
          <div className="main-overview">
            <div className="overview-card no-padding">
              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S/N</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">No of Products</th>
                      <th scope="col">No of Transactions</th>
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
                      <td>view</td>
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
                      <td>view</td>
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
                      <td>view</td>
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
                      <td>view</td>
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
                      <td>view</td>{" "}
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
                      <td>view</td>
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

export default Sellers;
