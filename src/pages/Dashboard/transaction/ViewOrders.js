import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axios } from "../../../components/baseUrl";
import SellersSidebar from "../dashboardComponents/SideBar";
import "./sellersorder.css";

const ViewOrders = () => {
  const [viewOrder, setViewOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const { orderId } = useParams();

  const showOrder = () => {
    setLoading(true);
    axios.get(`/order/${orderId}`).then((response) => {
      setViewOrder(response.data.data);
      console.log(response.data.data);
      setLoading(false);
    });
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const updateOrder = async (orderId) => {
    try {
      const { data } = await axios.patch("/order", {
        status: status,
        orderID: orderId,
      });
      setViewOrder(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showOrder();
  }, []);

  if (loading) {
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
    <>
      <div>
        <div className="grid-container">
          <header className="header">
            <div className="header__message">
              <h2>Order Info</h2>
            </div>
            <div className="header__search">
              <div className="notify-wrap position-relative">
                <i className="fa fa-bell" aria-hidden="true"></i>
                <span className="seller icon-notification position-absolute"></span>
              </div>
            </div>
          </header>

          <SellersSidebar />

          <main className="main">
            <div className="order-status">{viewOrder.status}</div>

            <div className="main-overview">
              <div className="overview-card d-flex mx-3">
                <table
                  className="table table-striped"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th>Buyer</th>
                      <th>
                        {viewOrder.User && viewOrder.User.firstName}{" "}
                        {viewOrder.User && viewOrder.User.LastName}
                      </th>
                      <th>
                        <div
                          style={{
                            color: "rgba(0, 0, 0, 0.62)",
                          }}
                        >
                          Update Order Status
                        </div>
                        <select
                          style={{ width: "10rem", borderRadius: "10px" }}
                          className="form-control text-center"
                          onChange={handleStatusChange}
                          name="status"
                          aria-describedby="Default select example"
                          placeholder="select status"
                        >
                          <option>
                            {" "}
                            {viewOrder.status === "PENDING"
                              ? "...Select Status"
                              : viewOrder.status}
                          </option>
                          <option value="PENDING">PENDING</option>
                          <option value="PROCESSING">CONFIRMED PAYMENT</option>
                          <option value="SHIPPED">ORDER SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCEL</option>
                        </select>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Product Name</td>
                      <td>
                        {viewOrder.product && viewOrder.product.productName}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Order Number</td>
                      <td>{viewOrder.orderNumber}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Amount Spent</td>
                      <td>USD {viewOrder.cost}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Order Status</td>
                      <td>
                        <div className="m">
                          <div style={{ width: "100px" }}>
                            {viewOrder.status === "PENDING" && (
                              <div className="bg-warning rounded-pill text-center mx-2">
                                PENDING
                              </div>
                            )}
                            {viewOrder.status === "PROCESSING" && (
                              <div className="bg-primary rounded-pill mx-2">
                                PROCESSING
                              </div>
                            )}
                            {viewOrder.status === "SHIPPED" && (
                              <div className="bg-info rounded-pill  text-center mx-2">
                                SHIPPED
                              </div>
                            )}
                            {viewOrder.status === "DELIVERED" && (
                              <div className="bg-success rounded-pill text-center mx-2">
                                DELIVERED
                              </div>
                            )}

                            {viewOrder.status === "CANCELLED" && (
                              <div className="bg-danger rounded-pill text-center mx-2">
                                CANCELLED
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Shipping Type</td>
                      <td>{viewOrder.shippingType}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Quantity Ordered</td>
                      <td>{viewOrder.quantityOrdered}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Date Created</td>
                      <td>{viewOrder.createdAt}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Payment Type</td>
                      <td>{viewOrder.paymentTerm}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Country Origin</td>
                      <td>{viewOrder.countryOfOrigin}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Destination</td>
                      <td>{viewOrder.destination}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Port of Discharge</td>
                      <td>{viewOrder.port}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Notes</td>
                      <td>{viewOrder.note}</td>
                      <td></td>
                    </tr>
                    <button
                      className="btn btn-dark"
                      onClick={() => updateOrder(viewOrder.id)}
                    >
                      Update
                    </button>
                  </tbody>
                </table>
              </div>

              <div className="overv">
                <div className="tracker" style={{ width: "100%" }}>
                  <div>
                    <h6 className="main-heading py-3">
                      {viewOrder.status === "DELIVERED" ? (
                        <div>Order Completed</div>
                      ) : null}
                    </h6>
                  </div>
                  {viewOrder.status && viewOrder.status === "PENDING" ? (
                    <div style={{ width: "60%" }}>
                      <div className="d-flex">
                        <div className="indicator"></div>
                        <h6 className="heading">Order Placed</h6>
                      </div>
                      <div className="side-tracker">
                        <p className="texts">
                          Placed order for 50MT of Dried Hibiscus to be
                          delivered to Port de Naiva in Cameroon
                        </p>
                      </div>
                    </div>
                  ) : null}
                  {viewOrder.status === "PROCESSING" && (
                    <div>
                      <div style={{ width: "60%" }}>
                        <div className="d-flex">
                          <div className="indicator"></div>
                          <h6 className="heading">Order Placed</h6>
                        </div>
                        <div className="side-tracker">
                          <p className="texts">
                            Placed order for 50MT of Dried Hibiscus to be
                            delivered to Port de Naiva in Cameroon
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
                            Uploaded and processed requirements in the payment
                            type of Deposit against Payment with the supplier
                            and it has been confirmed
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {viewOrder.status === "SHIPPED" && (
                    <div>
                      <div style={{ width: "60%" }}>
                        <div className="d-flex">
                          <div className="indicator"></div>
                          <h6 className="heading">Order Placed</h6>
                        </div>
                        <div className="side-tracker">
                          <p className="texts">
                            Placed order for 50MT of Dried Hibiscus to be
                            delivered to Port de Naiva in Cameroon
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
                            Uploaded and processed requirements in the payment
                            type of Deposit against Payment with the supplier
                            and it has been confirmed
                          </p>
                        </div>
                      </div>
                      <div style={{ width: "60%" }}>
                        <div className="d-flex">
                          <div className="indicator"></div>
                          <h6 className="heading">Order Shipped</h6>
                        </div>
                        <div className="side-tracker">
                          <p className="texts">
                            Order for 50MT of Dried Hibicus has been shipped
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {viewOrder.status && viewOrder.status === "DELIVERED" && (
                    <div>
                      <div style={{ width: "60%" }}>
                        <div className="d-flex">
                          <div className="indicator"></div>
                          <h6 className="heading">Order Placed</h6>
                        </div>
                        <div className="side-tracker">
                          <p className="texts">
                            Placed order for 50MT of Dried Hibiscus to be
                            delivered to Port de Naiva in Cameroon
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
                            Uploaded and processed requirements in the payment
                            type of Deposit against Payment with the supplier
                            and it has been confirmed
                          </p>
                        </div>
                      </div>
                      <div style={{ width: "60%" }}>
                        <div className="d-flex">
                          <div className="indicator"></div>
                          <h6 className="heading">Order Shipped</h6>
                        </div>
                        <div className="side-tracker">
                          <p className="texts">
                            Order for 50MT of Dried Hibicus has been shipped
                          </p>
                        </div>
                      </div>
                      <div style={{ width: "60%" }}>
                        <div className="d-flex">
                          <div className="indicator"></div>
                          <h6 className="heading">Order Delivered</h6>
                        </div>
                        <div className="side-tracker">
                          <p className="texts">
                            Order for 50MT of Dried Hibicus has been delivered
                            to Port de Naiva in Cameroon
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* <div style={{ width: "60%" }}>
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
                  </div> */}
                  {/* <div style={{ width: "60%" }}>
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
                  </div> */}
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
