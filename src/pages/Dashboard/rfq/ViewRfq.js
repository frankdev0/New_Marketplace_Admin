import React from "react";
import { Iconly } from "react-iconly";
import { Link } from "react-router-dom";
import SellersSidebar from "../dashboardComponents/SideBar";
import "./rfq.css";
import roundLogo from "../../../assets/img/round-logo.png";

const ViewRfq = () => {
  return (
    <>
      <div>
        <div className="grid-container">
          <header className="header">
            <div className="header__message">
              <h2>RFQ Details</h2>
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
            <div className="main-overview mx-2">
              <div className="row rfq-details">
                <div className="overview-card col-3">
                  <div className="text-center">
                    <div>
                      <img src={roundLogo} alt="round-logo" />
                    </div>
                    <h5>Supplier's MarketPlace</h5>
                    <p className="px-2">General RFQ Listing</p>
                  </div>
                  <hr />
                  <h6>Buyers Info</h6>
                  <div className="d-flex">
                    <i
                      className="fa fa-user-circle-o mt-1 px-1"
                      aria-hidden="true"
                    ></i>
                    <p>Audrey Oluchi Oji</p>
                  </div>
                  <div className="d-flex">
                    <i
                      className="fa fa-envelope-o mt-1 px-1"
                      aria-hidden="true"
                    ></i>
                    <p>nnaemeka@tradersofafrica.com</p>
                  </div>
                  <div className="d-flex">
                    <i
                      className="fa fa-building-o mt-1 px-1"
                      aria-hidden="true"
                    ></i>
                    <p>Dory Enterprises</p>
                  </div>

                  <div className="d-flex">
                    <i
                      className="fa fa-map-marker mt-1 px-1"
                      aria-hidden="true"
                    ></i>
                    <p>Lagos, Nigeria</p>
                  </div>
                </div>
                <div className="col-8 overview-card px-5">
                  <table
                    className="table table-striped"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>RFQ ID</th>
                        <th>No.12345</th>
                        <th>
                          <Link>view info</Link>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Product Name</td>
                        <td>Fresh Mint Leaves</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Shipping Terms</td>
                        <td>FOB</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Destination</td>
                        <td>Nigeria</td>
                        <td></td>
                      </tr>

                      <tr>
                        <td>Product Requirement</td>
                        <td>
                          How much will 20 metric tonnes of fresh mint leaves
                          cost? What’s your best price for that quantity
                        </td>
                        <td></td>
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

export default ViewRfq;
