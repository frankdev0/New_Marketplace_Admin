import React, { useEffect, useState } from "react";
import { Iconly } from "react-iconly";
import { Link } from "react-router-dom";
import { axios } from "../../../components/baseUrl";
import { ProtectedRoutes } from "../../../components/ProtectedRoutes";
import SellersSidebar from "../dashboardComponents/SideBar";

const SellersRfqs = () => {
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewRfq, setViewRfq] = useState([]);

  const getRfqs = async () => {
    try {
      axios.get("/rfq").then((response) => {
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

  const showRfqDetails = (rfqID) => {
    setLoading(true);
    axios.get(`/rfq/${rfqID}`).then((response) => {
      setViewRfq(response.data.data);
      console.log(response.data.data);
      setLoading(false);
    });
  };

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
                  <div className="d-flex justify-content-between mt-4">
                    <h3>10</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Open RFQ</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div className="d-flex justify-content-between mt-4">
                    <h3>22</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Processing RFQ</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div className="d-flex justify-content-between mt-4">
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
                      {rfqs &&
                        rfqs.map((rfq, index) => {
                          return (
                            <tr key={rfq.id}>
                              <td scope="row">{index + 1}</td>
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
                                    <p>{rfq.productName}</p>
                                  </div>
                                </div>
                              </td>
                              <td>USD {rfq.targetPrice}</td>
                              <td>{rfq.termsOfTrade}</td>
                              <td>{rfq.paymentTerms}</td>
                              <td>
                                <div className="text-primary">{rfq.status}</div>
                              </td>
                              <td>
                                <Link
                                  to="/view-rfq"
                                  onClick={(e) => showRfqDetails(rfq.id)}
                                >
                                  view
                                </Link>
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
    </>
  );
};

export default ProtectedRoutes(SellersRfqs, ["BUYER"]);
