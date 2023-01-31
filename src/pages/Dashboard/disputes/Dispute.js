import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axios } from "../../../components/baseUrl";
import SellersSidebar from "../dashboardComponents/SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../../components/AppState";
import dayjs from "dayjs";
import { ProtectedRoutes } from "../../../components/ProtectedRoutes";

const Dispute = () => {
  const [disputes, setDisputes] = useState([]);
  const [viewDispute, setViewDispute] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewLoader, setViewLoader] = useState(false);

  const { user, activitySummary } = useContext(AppContext);

  console.log("activitySummary from categories", activitySummary);

  const navigate = useNavigate();

  const getDisputes = async () => {
    try {
      axios.get("/dispute").then((response) => {
        setDisputes(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      });
    } catch (error) {
      if (error) {
        toast.error("FAILED TRY AGAIN", {
          position: "top-right",
          autoClose: 4000,
          pauseHover: true,
          draggable: true,
        });
        console.log(error);
      }
      setLoading(false);
    }
  };

  const UpdateDispute = async (id) => {
    try {
      const { data } = await axios.patch("/dispute", {
        status: "RESOLVED",
        disputeID: id,
      });
      setViewDispute(data.data);
      setTimeout(() => {
        navigate("/disputes");
      }, 2000);
      toast.success("DISPUTE UPDATED SUCCESSFULLY", {
        position: "top-right",
        autoClose: 2000,
        pauseHover: true,
        draggable: true,
      });
    } catch (error) {
      if (error) {
        toast.error("FAILED TRY AGAIN", {
          position: "top-right",
          autoClose: 4000,
          pauseHover: true,
          draggable: true,
        });
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getDisputes();
  }, []);

  const showDispute = (disputeID) => {
    setViewLoader(true);
    axios.get(`/dispute/${disputeID}`).then((response) => {
      setViewDispute(response.data.data);
      console.log(response.data.data);
      setViewLoader(false);
    });
  };

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
          <ToastContainer />
          <header className="header">
            {/* <div className="header__message">
              <h2>All Buyers Dispute</h2>
            </div> */}
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
                  <h2>Total Disputes</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div className="d-flex justify-content-between mt-4">
                    <h3>{activitySummary.total_disputes}</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Total Resolved Disputes</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div className="d-flex justify-content-between mt-4">
                    <h3>{activitySummary.total_resolved_disputes}</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Total Pending Disputes</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div className="d-flex justify-content-between mt-4">
                    <h3>{activitySummary.total_pending_disputes}</h3>
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
                        {/* <th scope="col">Buyers Name</th> */}
                        <th scope="col">Subject</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {disputes && disputes.map((dispute) => { 
                      return (
                        <div> */}
                      {disputes &&
                        disputes.map((dispute, index) => {
                          return (
                            <tr key={dispute.id}>
                              <th scope="row">{index + 1}</th>
                              <td>{dispute.subject}</td>
                              <td>
                                {dayjs(dispute.createdAt).format("D MMMM YYYY")}
                              </td>
                              <td>
                                {dispute.status === "PENDING" && (
                                  <div className="text-warning rounded-pill">
                                    PENDING
                                  </div>
                                )}
                                {dispute.status === "RESOLVED" && (
                                  <div className="text-success rounded-pill">
                                    RESOLVED
                                  </div>
                                )}
                              </td>

                              <td>
                                {" "}
                                <Link
                                  to="/n"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  onClick={(e) => showDispute(dispute.id)}
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
                                            Dispute Details
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
                                            <div className="d-flex my-3">
                                              <i
                                                className="fa fa-user mt-1 px-1"
                                                aria-hidden="true"
                                              ></i>
                                              <div>
                                                {viewDispute.User &&
                                                  viewDispute.User
                                                    .firstName}{" "}
                                                {viewDispute.User &&
                                                  viewDispute.User.LastName}
                                              </div>
                                            </div>
                                            <div className="d-flex my-3">
                                              <i
                                                className="fa fa-envelope-o mt-1 px-1"
                                                aria-hidden="true"
                                              ></i>
                                              <div>
                                                {viewDispute.User &&
                                                  viewDispute.User.email}
                                              </div>
                                            </div>
                                            <div className="d-flex my-3">
                                              <i
                                                className="fa fa-phone mt-1 px-1"
                                                aria-hidden="true"
                                              ></i>
                                              <div>phoneNumber</div>
                                            </div>
                                            <div className="d-flex my-3">
                                              <i
                                                className="fa fa-calendar mt-1 px-1"
                                                aria-hidden="true"
                                              ></i>
                                              <p>
                                                Created At:
                                                <span className="mx-2">
                                                  {dayjs(
                                                    viewDispute.createdAt
                                                  ).format("D MMMM YYYY")}
                                                </span>
                                              </p>
                                            </div>
                                          </div>

                                          <div
                                            className="information-box-right"
                                            style={{ padding: "15px" }}
                                          >
                                            <div className="d-flex my-3">
                                              <i
                                                className="fa fa-exclamation-circle mt-1 px-1"
                                                aria-hidden="true"
                                              ></i>
                                              <p>
                                                Subject:
                                                <span className="mx-2">
                                                  {viewDispute.subject}
                                                </span>
                                              </p>
                                            </div>

                                            <div className="d-flex my-3">
                                              <i
                                                className="fa fa-pencil-square-o mt-1 px-1"
                                                aria-hidden="true"
                                              ></i>
                                              Complaint:
                                              <span className="mx-2">
                                                {viewDispute.complaint}
                                              </span>
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
                                          <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={() =>
                                              UpdateDispute(dispute.id)
                                            }
                                          >
                                            Mark as Resolved
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

                      {/* <td>0123456543</td>
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
                        </div> */}

                      {/* }     
                       ))} */}
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

export default ProtectedRoutes(Dispute);
