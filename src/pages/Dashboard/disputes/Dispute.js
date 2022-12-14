import React from "react";
import { Iconly } from "react-iconly";
import { Link } from "react-router-dom";
import SellersSidebar from "../dashboardComponents/SideBar";

const Dispute = () => {
  return (
    <>
      <div>
        <div className="grid-container">
          <header className="header">
            <div className="header__message">
              <h2>All Buyers Dispute</h2>
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
                  <h2>Total Disputes</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div className="d-flex justify-content-between mt-4">
                    <h3>10</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Total Resolved Disputes</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div className="d-flex justify-content-between mt-4">
                    <h3>22</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Total Pending Disputes</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div className="d-flex justify-content-between mt-4">
                    <h3>5</h3>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="section-title">Latest Dispute</h1>
            <div className="main-overview">
              <div className="overview-card no-padding">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">S/N</th>
                        <th scope="col">Buyers Name</th>
                        <th scope="col">Subject</th>
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
                        <td>
                          <div className="text-warning">Pending</div>
                        </td>
                        <td>
                          <Link
                            to="/n"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            view
                          </Link>
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
                        <td>
                          <div className="text-success">Resolved</div>
                        </td>
                        <td>
                          <Link
                            to="/n"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            view
                          </Link>
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
                        <td>
                          <div className="text-danger">Open</div>
                        </td>
                        <td>
                          <Link
                            to="/n"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            view
                          </Link>
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
                        <td>
                          <div className="text-success">Resolved</div>
                        </td>
                        <td>
                          <Link
                            to="/n"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            view
                          </Link>
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
                        <td>
                          <div className="text-danger">Open</div>
                        </td>
                        <td>
                          <Link
                            to="/n"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            view
                          </Link>
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
                        <td>
                          <div className="text-warning">Pending</div>
                        </td>
                        <td>
                          <Link
                            to="/n"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            view
                          </Link>
                        </td>

                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  Disputes
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>

                              <main className="main">
                                <div className="modal-body overview-card">
                                  <div className="my-5">
                                    <h5 className="heading">Subject:</h5>
                                    <span>Supply of Susbstandard Goods</span>
                                  </div>

                                  <p>
                                    ToFa has developed partnerships with
                                    Vietnam’s top suppliers to provide
                                    high-quality cashew nuts to markets
                                    worldwide. Vietnam has been producing
                                    cashews throughout the country since the
                                    early 1980s. Cashew nuts are grown in
                                    various regions in Vietnam, including Binh
                                    Phuoc, Dak Nong, Dong Nai, Binh Duong
                                    provinces. Particularly, Binh Phuoc province
                                    is known as the leading region for the
                                    growth of cashew nuts, constituting over 50%
                                    of the entire cashew nuts production in
                                    Vietnam. Tridge can provide two types of
                                    cashew nuts for export: kernel and processed
                                    nuts. With kernel cashew nuts, there are
                                    various sizes ranging from W180 to W500. For
                                    processed nuts, salt-roasted cashew is most
                                    popular. Moreover, Tridge can provide
                                    organic cashew kernel, which is gaining
                                    popularity in the market. he cashew nuts in
                                    Vietnam are based on size, color, and degree
                                    of rupture.. Tridge can provide two types of
                                    cashew nuts for export: kernel and processed
                                    nuts. With kernel cashew nuts, there are
                                    various sizes ranging from W180 to W500. For
                                    processed nuts, salt-roasted cashew is most
                                    popular. Moreover, Tridge can provide
                                    organic cashew kernel, which is gaining
                                    popularity in the market. he cashew nuts in
                                    Vietnam are based on size, color, and degree
                                    of rupture. Cashew nuts are grown in various
                                    regions in Vietnam, including Binh Phuoc,
                                    Dak Nong, Dong Nai, Binh Duong provinces.
                                    Particularly, Binh Phuoc province is known
                                    as the leading region for the growth of
                                    cashew nuts, constituting over 50% of the
                                    entire cashew nuts production in Vietnam.{" "}
                                  </p>
                                </div>
                              </main>

                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-success"
                                >
                                  Mark as Resolved
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
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

export default Dispute;
