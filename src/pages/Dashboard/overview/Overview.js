import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../components/AppState";
import { axios } from "../../../components/baseUrl";
import { ProtectedRoutes } from "../../../components/ProtectedRoutes";
import SellersSidebar from "../dashboardComponents/SideBar";

const Overview = () => {
  const [activitySummary, setActivitySummary] = useState();
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AppContext);
  // const navigate = useNavigate();

  const getActivitySummary = async () => {
    try {
      await axios.get("/dashboard/admin/activity-summary").then((response) => {
        setActivitySummary(response.data.data);
        console.log(response.data);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      // navigate("/unauthorized");
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
                  <i className="fa fa-search" aria-hidden="true"></i>
                  <input
                    type="text"
                    className="form-control custom-style"
                    id=""
                    placeholder="Search for orders, inquiries and more"
                  />
                </div>
              </form>

              <div className="notify-wrap position-relative">
                <i className="fa fa-bell" aria-hidden="true"></i>
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
                    <h3>
                      {user.role === "SUPER_ADMIN" || "SOURCE_PRO_ADMIN"
                        ? activitySummary &&
                          activitySummary.total_number_of_products
                        : "NaN"}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Total Transaction Revenue</h2>
                  <p>Detailed history is on the Order page</p>

                  <div className="d-flex justify-content-between mt-4">
                    <h3>
                      USD{" "}
                      {activitySummary &&
                        activitySummary.total_transactions_revenue}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Total Orders</h2>
                  <p>Detailed history is on the Order page</p>
                  <div className="d-flex justify-content-between mt-4">
                    <h3>
                      {activitySummary &&
                        activitySummary.total_confirmed_orders +
                          activitySummary &&
                        activitySummary.total_delivered_orders +
                          activitySummary &&
                        activitySummary.total_pending_orders +
                          activitySummary &&
                        activitySummary.total_shipped_orders}
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
                    <h3>{activitySummary && activitySummary.total_buyers}</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Total Sellers</h2>
                  <p>Detailed history is on the Seller's page</p>
                  <div className="d-flex justify-content-between mt-4">
                    <h3>{activitySummary && activitySummary.total_sellers}</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>All RFQ's</h2>
                  <p>Detailed history is on the RFQ page</p>
                  <div className="d-flex justify-content-between mt-4">
                    <h3>
                      {activitySummary &&
                        activitySummary.total_number_of_enquiries}
                    </h3>
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

export default ProtectedRoutes(Overview, [
  "SOURCE_PRO_ADMIN",
  "FINANCE",
  "SUPER_ADMIN",
]);
