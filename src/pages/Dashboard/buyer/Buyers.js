import React, { useState, useEffect, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import { Iconly } from "react-iconly";
import SellersSidebar from "../dashboardComponents/SideBar";
import Search from "../dashboardComponents/Search";
import { axios } from "../../../components/baseUrl";
import PaginationComponent from "../../../components/PaginationComponent";
import { AppContext } from "../../../components/AppState";
import "./buyer.css";

const Buyers = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 5;
  const [totalItems, setTotalItems] = useState(0);
  const [viewBuyer, setViewBuyer] = useState([]);
  const [viewLoader, setViewLoader] = useState(false);
  const [summary, setSummary] = useState("");
  const [viewSummary, setViewSummary] = useState("");

  const { user } = useContext(AppContext);

  const commentsData = useMemo(() => {
    let computedBuyers = buyers;

    if (search) {
      computedBuyers = computedBuyers.filter(
        (comment) =>
          comment.LastName.toLowerCase().includes(search.toLowerCase()) ||
          comment.firstName.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedBuyers.length);

    //currentPage Slice

    return computedBuyers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [buyers, currentPage, search]);

  const getBuyers = async () => {
    try {
      axios.get("/auth/users?role=BUYER").then((response) => {
        setBuyers(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBuyers();
  }, []);

  const getSummary = async () => {
    try {
      await axios
        .get("/dashboard/admin/buyer-activity-summary")
        .then((response) => {
          setSummary(response.data.data);
          console.log("summary", response.data.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  };
  useEffect(() => {
    getSummary();
  }, []);

  const showBuyer = async (buyerID) => {
    try {
      setViewLoader(true);
      await axios.get(`/auth/users/user/${buyerID}`).then((response) => {
        setViewBuyer(response.data.data);
        console.log(response.data.data);
        setViewLoader(false);
      });
      await axios
        .get("/dashboard/admin/buyer-activity-summary", {
          buyerId: buyerID,
        })
        .then((response) => {
          setViewSummary(response.data.data);
          console.log("for each buyer", response.data.data);
        });
    } catch (error) {
      console.log(error);
    }
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
      <div className="grid-container">
        <header className="header">
          <div className="header__message">
            <h2>
              Hello {user.firstName} {user.LastName}
            </h2>
          </div>

          <div className="header__search">
            <Search
              onSearch={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
            />

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
                <h2>Total Buyers</h2>

                <div className="d-flex justify-content-between mt-4">
                  <h3>120</h3>
                </div>
              </div>
            </div>
            <div className="overview-card">
              <div>
                <h2>All RFQ's</h2>
                <p>Detailed history is on the RFQ page</p>
                <div className="d-flex justify-content-between mt-4">
                  <h3>{summary.total_number_of_enquiries}</h3>
                </div>
              </div>
            </div>
            <div className="overview-card">
              <div>
                <h2>Total Orders</h2>
                <p>Detailed history is on the Order page</p>
                <div className="d-flex justify-content-between mt-4">
                  <h3>{summary.total_number_of_orders}</h3>
                </div>
              </div>
            </div>
          </div>

          <h1 className="section-title">All Buyers</h1>
          <div className="main-overview">
            <div className="overview-card no-padding">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S/N</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Email</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commentsData &&
                      commentsData.map((buyer, index) => {
                        return (
                          <tr key={buyer.id}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <div className="d-flex">
                                <div className="flex-grow-1">
                                  <p>
                                    {buyer.firstName} {buyer.LastName}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>{buyer.phoneNumber}</td>

                            <td>{buyer.email}</td>
                            <td>
                              <Link
                                to="/n"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={(e) => showBuyer(buyer.id)}
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
                                          Buyers Information
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
                                              Name: {viewBuyer.firstName}{" "}
                                              {viewBuyer.LastName}
                                            </h6>
                                          </div>
                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-building-o mt-1 px-1"
                                              aria-hidden="true"
                                            ></i>
                                            <p>Company Name</p>
                                          </div>
                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-envelope-o mt-1 px-1"
                                              aria-hidden="true"
                                            ></i>
                                            <div>{viewBuyer.email}</div>
                                          </div>
                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-phone mt-1 px-1"
                                              aria-hidden="true"
                                            ></i>
                                            <div>{viewBuyer.phoneNumber}</div>
                                          </div>
                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-map-marker mt-1 px-1"
                                              aria-hidden="true"
                                            ></i>
                                            <p>Ojulegba</p>
                                          </div>
                                        </div>

                                        <div
                                          className="information-box-right"
                                          style={{ padding: "15px" }}
                                        >
                                          <div className="d-flex">
                                            <h6>Buyer's Summary:</h6>
                                          </div>
                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-question-circle mt-1 px-1"
                                              aria-hidden="true"
                                            ></i>
                                            <p>
                                              Total Enquiries:{" "}
                                              {
                                                viewSummary.total_number_of_enquiries
                                              }{" "}
                                            </p>
                                          </div>
                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-shopping-cart mt-1 px-1"
                                              aria-hidden="true"
                                            ></i>
                                            <div>
                                              Total Orders:{" "}
                                              {
                                                viewSummary.total_number_of_orders
                                              }
                                            </div>
                                          </div>
                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-pencil-square-o mt-1 px-1"
                                              aria-hidden="true"
                                            ></i>
                                            <div>
                                              Total Responded Quotes:{" "}
                                              {
                                                viewSummary.total_responded_quote
                                              }{" "}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="modal-body">
                                        Name: {viewBuyer.firstName}{" "}
                                        {viewBuyer.LastName}
                                      </div>
                                      <div className="modal-body">
                                        phoneNumber: {viewBuyer.phoneNumber}
                                      </div>
                                      <div className="modal-body">
                                        Total Enquiries:{" "}
                                        {viewSummary.total_number_of_enquiries}
                                      </div>
                                      <div className="modal-body">
                                        Total Orders:{" "}
                                        {viewSummary.total_number_of_orders}
                                      </div>
                                      <div className="modal-body">
                                        Total Responded Quotes:{" "}
                                        {viewSummary.total_responded_quote}
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
          <PaginationComponent
            total={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </main>
      </div>
    </>
  );
};

export default Buyers;
