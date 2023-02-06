import React, { useContext, useEffect, useState } from "react";
import SellersSidebar from "../../dashboardComponents/SideBar";
import { axios } from "../../../../components/baseUrl";
import { AppContext } from "../../../../components/AppState";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const SellersSubscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewSubscription, setViewSubscription] = useState([]);
  const [viewLoader, setViewLoader] = useState(false);

  const { user } = useContext(AppContext);

  const getSubscriptions = async () => {
    try {
      axios.get("/subscription").then((response) => {
        setSubscriptions(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  const showSubscription = (subscriptionId) => {
    setViewLoader(true);
    axios.get(`/subscription/${subscriptionId}`).then((response) => {
      setViewSubscription(response.data.data);
      console.log(response.data.data);
      setViewLoader(false);
    });
  };

  console.log(user);

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
                <h2>Total Basic</h2>
                {/* <p>Detailed transaction history is on the order page</p> */}
                <div className="d-flex justify-content-between mt-4">
                  <h3>10</h3>
                </div>
              </div>
            </div>
            <div className="overview-card">
              <div>
                <h2>Total Premium</h2>
                {/* <p>Detailed transaction history is on the order page</p> */}
                <div className="d-flex justify-content-between mt-4">
                  <h3>22</h3>
                </div>
              </div>
            </div>
          </div>

          <h1 className="section-title">Sellers Subscription</h1>
          <div className="main-overview">
            <div className="overview-card no-padding">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S/N</th>
                      <th scope="col">Sellers Name</th>
                      <th scope="col">Plan</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions &&
                      subscriptions.map((subscription, index) => {
                        return (
                          <tr key={subscription.id}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              {subscription.User && subscription.User.firstName}{" "}
                              {subscription.User && subscription.User.LastName}
                            </td>
                            <td>{subscription.plan}</td>

                            <td>{subscription.duration}</td>
                            <td>
                              {" "}
                              <Link
                                to="/n"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={(e) =>
                                  showSubscription(subscription.id)
                                }
                              >
                                view
                              </Link>
                              <div
                                className="modal fade"
                                id="exampleModal"
                                tabIndex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                              >
                                {viewLoader ? (
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
                                ) : (
                                  <div
                                    className="modal-dialog modal-lg"
                                    style={{
                                      backgroundColor: "#F5F5F5",
                                    }}
                                  >
                                    <div
                                      className="modal-content"
                                      style={{
                                        backgroundColor: "#F5F5F5",
                                      }}
                                    >
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title"
                                          id="exampleModalLabel"
                                        >
                                          Sellers Subscription Details
                                        </h5>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div className="modal-body d-flex">
                                        <div
                                          className="information-box-left"
                                          style={{ padding: "15px" }}
                                        >
                                          <div className="d-flex">
                                            <h6>
                                              Name:{" "}
                                              {viewSubscription.User &&
                                                viewSubscription.User
                                                  .firstName}{" "}
                                              {viewSubscription.User &&
                                                viewSubscription.User.LastName}
                                            </h6>
                                          </div>

                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-envelope-o mt-1 px-1"
                                              aria-hidden="true"
                                            ></i>
                                            <div>
                                              {viewSubscription.User &&
                                                viewSubscription.User.email}
                                            </div>
                                          </div>
                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-phone mt-1 px-1"
                                              aria-hidden="true"
                                            ></i>
                                            <div>
                                              {viewSubscription.User &&
                                                viewSubscription.User
                                                  .phoneNumber}
                                            </div>
                                          </div>
                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-star mt-1 px-1"
                                              aria-hidden="true"
                                            ></i>

                                            <p> {viewSubscription.plan}</p>
                                          </div>
                                        </div>

                                        <div
                                          className="information-box-right"
                                          style={{ padding: "15px" }}
                                        >
                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-calendar mt-1 px-1 mx-2"
                                              aria-hidden="true"
                                            ></i>
                                            <p>
                                              Start Date:
                                              {dayjs(
                                                viewSubscription.startDate
                                              ).format("D MMMM YYYY")}
                                            </p>
                                          </div>
                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-calendar mt-1 px-1 mx-2"
                                              aria-hidden="true"
                                            ></i>
                                            <div>
                                              End Date:
                                              {dayjs(
                                                viewSubscription.endDate
                                              ).format("D MMMM YYYY")}
                                            </div>
                                          </div>
                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-clock-o mt-1 px-1 mx-2"
                                              aria-hidden="true"
                                            ></i>
                                            <div>
                                              {viewSubscription.duration}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          data-bs-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
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
    </>
  );
};

export default SellersSubscription;
