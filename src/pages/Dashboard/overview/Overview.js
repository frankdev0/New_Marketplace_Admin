import React, { useContext, useEffect, useState } from "react";
import { Iconly } from "react-iconly";
import { Link } from "react-router-dom";
import { AppContext } from "../../../components/AppState";
import { axios } from "../../../components/baseUrl";
import SellersSidebar from "../dashboardComponents/SideBar";

const Overview = () => {
  const [activitySummaty, setActivitySummary] = useState();
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AppContext);

  const getActivitySummary = async () => {
    try {
      axios.get("/dashboard/admin/activity-summary").then((response) => {
        setActivitySummary(response.data.data);
        console.log(response.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getActivitySummary();
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
              <h2>
                Hello {user.firstName} {user.LastName}
              </h2>
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
                  <p>Detailed history is on the Product page</p>
                  <div className="d-flex justify-content-between mt-4">
                    <h3>{activitySummaty.total_number_of_products}</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Total Transaction Revenue</h2>
                  <p>Detailed history is on the Order page</p>

                  <div className="d-flex justify-content-between mt-4">
                    <h3>USD {activitySummaty.total_transactions_revenue}</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Total Orders</h2>
                  <p>Detailed history is on the Order page</p>
                  <div className="d-flex justify-content-between mt-4">
                    <h3>
                      {activitySummaty.total_confirmed_orders +
                        activitySummaty.total_delivered_orders +
                        activitySummaty.total_pending_orders +
                        activitySummaty.total_shipped_orders}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="main-overview">
              <div className="overview-card">
                <div>
                  <h2>Total Buyers</h2>
                  <p>Detailed history is on the Buyer's page</p>
                  <div className="d-flex justify-content-between mt-4">
                    <h3>{activitySummaty.total_buyers}</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Total Sellers</h2>
                  <p>Detailed history is on the Seller's page</p>
                  <div className="d-flex justify-content-between mt-4">
                    <h3>{activitySummaty.total_sellers}</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>All RFQ's</h2>
                  <p>Detailed history is on the RFQ page</p>
                  <div className="d-flex justify-content-between mt-4">
                    <h3>{activitySummaty.total_number_of_enquiries}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="main-overview">
              <div className="overview-card">
                <div className="table-responsive"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Overview;
