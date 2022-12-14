import React from "react";
import { Iconly } from "react-iconly";
import { Link } from "react-router-dom";
import SellersSidebar from "../dashboardComponents/SideBar";
import "./sellersorder.css";

const ViewOrders = () => {
  return (
    <>
      <div>
        <div className="grid-container">
          <header className="header">
            <div className="header__message">
              <h2>Order Info</h2>
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
            <div className="main-overview">
              <div className="overview-card d-flex mx-3">
                <table
                  className="table table-striped"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th>Buyer</th>
                      <th>Erhun Abbe</th>
                      <th>
                        <Link>view info</Link>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Product Name</td>
                      <td>Dried Hibiscus</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Order Number</td>
                      <td>No. 123445</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Amount Spent</td>
                      <td>USD 12,000</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Date sent</td>
                      <td>12/09/2022</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Payment Type</td>
                      <td>Deposit Against Payment</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Origin</td>
                      <td>Cameroon</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Destination</td>
                      <td>Nigeria</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Port of Discharge</td>
                      <td>Port of Novia</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Notes</td>
                      <td>I need the hibiscus to be truly of top quality</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="overv">
                <div className="tracker" style={{ width: "100%" }}>
                  <div>
                    <h6 className="main-heading py-3">Order Completed</h6>
                  </div>
                  <div style={{ width: "60%" }}>
                    <div className="d-flex">
                      <div className="indicator"></div>
                      <h6 className="heading">Order Received</h6>
                    </div>
                    <div className="side-tracker">
                      <p className="texts">
                        Placed order for 50MT of Dried Hibiscus to be delivered
                        to Port de Naiva in Cameroon
                      </p>
                    </div>
                  </div>
                  <div style={{ width: "60%" }}>
                    <div className="d-flex">
                      <div className="indicator"></div>
                      <h6 className="heading">Response Sent to Buyer</h6>
                    </div>
                    <div className="side-tracker">
                      <p className="texts">
                        A response was sent and further conversation about the
                        transaction was carried out between the buyer and the
                        supllier on the message center. Terms were agreed to on
                        both sides.
                      </p>
                    </div>
                  </div>
                  <div style={{ width: "60%" }}>
                    <div className="d-flex">
                      <div className="indicator"></div>
                      <h6 className="heading">Payment Successful</h6>
                    </div>
                    <div className="side-tracker">
                      <p className="texts">
                        Uploaded and processed requirements in the payment type
                        of Deposit Against Payment with the supplier and it has
                        been confirmed
                      </p>
                    </div>
                  </div>
                  <div style={{ width: "60%" }}>
                    <div className="d-flex">
                      <div className="red-indicator"></div>
                      <h6 className="heading">Order Shipped</h6>
                    </div>
                    <div className="side-tracker">
                      <p className="texts">
                        Order of 50MT tonne of dried hibiscus has been shipped
                        to buyer
                      </p>
                    </div>
                  </div>
                  <div style={{ width: "60%" }}>
                    <div className="d-flex">
                      <div className="red-indicator"></div>
                      <h6 className="heading">Order Delivered</h6>
                    </div>
                    <div className="side-tracker">
                      <p className="texts">
                        Order of 50MT tonne of dried hibiscus has been delivered
                        to Port de Novia in Cameroon and confirmed by Buyer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ViewOrders;
