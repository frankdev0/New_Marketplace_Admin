import React, { useContext, useEffect, useMemo, useState } from "react";
import { Iconly, User } from "react-iconly";
import { Link } from "react-router-dom";
import { AppContext } from "../../../components/AppState";
import { axios } from "../../../components/baseUrl";
import PaginationComponent from "../../../components/PaginationComponent";
import Search from "../dashboardComponents/Search";
import SellersSidebar from "../dashboardComponents/SideBar";

const Sellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewSeller, setViewSeller] = useState([]);
  const [viewLoader, setViewLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 5;
  const [totalItems, setTotalItems] = useState(0);
  const [summary, setSummary] = useState("");

  const { user, userLoading } = useContext(AppContext);

  const commentsData = useMemo(() => {
    let computedSellers = sellers;

    if (search) {
      computedSellers = computedSellers.filter(
        (comment) =>
          comment.LastName.toLowerCase().includes(search.toLowerCase()) ||
          comment.firstName.toLowerCase().includes(search.toLowerCase()) ||
          comment.hearAboutUs.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedSellers.length);

    //currentPage Slice

    return computedSellers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [sellers, currentPage, search]);

  useEffect(() => {
    axios.get("/auth/current-user").then((res) => {
      const user = res.data.currentUser;
      console.log("my first user", user.role);
      if (user.role === "SUPER_ADMIN") {
        console.log("my second user", user.role);
        axios.get("/auth/users?role=SELLER").then((res) => {
          setSellers(res.data.data);
          console.log("seller info", res.data.data);
        });
        axios.get("/dashboard/admin/activity-summary").then((response) => {
          setSummary(response.data.data);
          console.log("all sellers summary", response.data.data);
          setLoading(false);
        });
      }
      if (user.role === "AFCTCA") {
        axios
          .get("/auth/users?role=SELLER&hearAboutUs=AFCTCA")
          .then((response) => {
            setSellers(response.data.data);
            console.log("after-Sellers", response.data.data);
          });
        axios
          .post("/dashboard/admin/seller-activity-summary", {
            hearAboutUs: "AFCTCA",
          })
          .then((response) => {
            setSummary(response.data.data);
            console.log("AFCTCA summary", response.data.data);
            setLoading(false);
          });
      } else if (user.role === "OLD_MUTUAL") {
        axios
          .get("/auth/users?role=SELLER&hearAboutUs=OLD_MUTUAL")
          .then((response) => {
            setSellers(response.data.data);
            console.log("after-Sellers", response.data.data);
          });
        axios
          .post("/dashboard/admin/seller-activity-summary", {
            hearAboutUs: "OLD_MUTUAL",
          })
          .then((response) => {
            setSummary(response.data.data);
            console.log("OLD_MUTUAL summary", response.data.data);
            setLoading(false);
          });
      }
    });
  }, []);

  const handleSellers = async (e) => {
    if (e.target.value === "sellers") {
      await axios.get("/auth/users?role=SELLER").then((response) => {
        setSellers(response.data.data);
        console.log("buyers", response.data.data);
      });
    } else if (e.target.value === "after-sellers") {
      axios
        .get("/auth/users?role=SELLER&hearAboutUs=AFCTCA")
        .then((response) => {
          setSellers(response.data.data);
          console.log("after-Sellers", response.data.data);
        });
      await axios
        .post("/dashboard/admin/seller-activity-summary", {
          hearAboutUs: "AFCTCA",
        })
        .then((response) => {
          setSummary(response.data.data);
          console.log("AFCTCA summary", response.data.data);
          setLoading(false);
        });
    } else if (e.target.value === "oldMutual-sellers") {
      axios
        .get("/auth/users?role=SELLER&hearAboutUs=OLD_MUTUAL")
        .then((response) => {
          setSellers(response.data.data);
          console.log("oldMutual-Sellers", response.data.data);
        });
      await axios
        .post("/dashboard/admin/seller-activity-summary", {
          hearAboutUs: "OLD_MUTUAL",
        })
        .then((response) => {
          setSummary(response.data.data);
          console.log("AFCTCA summary", response.data.data);
          setLoading(false);
        });
    }
  };

  const showSeller = async (sellerID) => {
    try {
      setViewLoader(true);
      await axios.get(`/auth/users/user/${sellerID}`).then((response) => {
        setViewSeller(response.data.data);
        console.log(response.data.data);
        setViewLoader(false);
      });
      await axios.get(`/dashboard/seller/${sellerID}`).then((response) => {
        console.log("from view seller", response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (userLoading) {
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
                <h2>Total Confirmed Orders</h2>

                <div className="d-flex justify-content-between mt-4">
                  <h3>{summary.total_confirmed_orders}</h3>
                </div>
              </div>
            </div>
            <div className="overview-card">
              <div>
                <h2>Total Pending Orders</h2>

                <div className="d-flex justify-content-between mt-4">
                  <h3>{summary.total_pending_orders}</h3>
                </div>
              </div>
            </div>
            <div className="overview-card">
              <div>
                <h2>Total Shipped Orders</h2>
                <div className="d-flex justify-content-between mt-4">
                  <h3>{summary.total_shipped_orders}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="my-2">
            {user.role === "AFCTCA" && (
              <select
                className="form-control"
                onChange={handleSellers}
                style={{ width: "10rem", borderRadius: "10px" }}
              >
                <option>Select Seller</option>
                <option value="sellers">All Sellers</option>
                <option value="oldMutual-sellers">OldMutual Sellers</option>
                <option value="after-sellers">After Sellers</option>
              </select>
            )}

            {user.role === "AFCTCA" && (
              <select
                className="form-control"
                onChange={handleSellers}
                style={{ width: "10rem", borderRadius: "10px" }}
              >
                <option>Select Seller</option>

                <option value="after-sellers">After Sellers</option>
              </select>
            )}

            {user.role === "SUPER_ADMIN" && (
              <select
                className="form-control"
                onChange={handleSellers}
                style={{ width: "10rem", borderRadius: "10px" }}
              >
                <option>Select Seller</option>
                <option value="sellers">All Sellers</option>
                <option value="oldMutual-sellers">OldMutual Sellers</option>
                <option value="after-sellers">After Sellers</option>
              </select>
            )}
          </div>

          <h1 className="section-title">All Sellers</h1>
          <div className="main-overview">
            <div className="overview-card no-padding">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S/N</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Hear About Us</th>
                      <th scope="col">Email</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commentsData &&
                      commentsData.map((seller, index) => {
                        return (
                          <tr key={seller.id}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <div className="d-flex">
                                <div className="flex-grow-1">
                                  <p>
                                    {seller.firstName} {seller.LastName}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>{seller.phoneNumber}</td>

                            <td>{seller.hearAboutUs}</td>
                            <td>{seller.email}</td>
                            <td>
                              <Link
                                to="/n"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={(e) => showSeller(seller.id)}
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
                                          Sellers Information
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
                                              Name: {viewSeller.firstName}{" "}
                                              {viewSeller.LastName}
                                            </h6>
                                          </div>
                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-building-o mt-1 px-1"
                                              aria-hidden="true"
                                            ></i>
                                            <p>{viewSeller.businessName}</p>
                                          </div>
                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-envelope-o mt-1 px-1"
                                              aria-hidden="true"
                                            ></i>
                                            <div>{viewSeller.email}</div>
                                          </div>
                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-phone mt-1 px-1"
                                              aria-hidden="true"
                                            ></i>
                                            <div>{viewSeller.phoneNumber}</div>
                                          </div>
                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-map-marker mt-1 px-1"
                                              aria-hidden="true"
                                            ></i>
                                            <p>{viewSeller.address}</p>
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
                                              {/* {
                                                viewSummary.total_number_of_enquiries
                                              } */}
                                            </p>
                                          </div>
                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-shopping-cart mt-1 px-1"
                                              aria-hidden="true"
                                            ></i>
                                            <div>
                                              Total Orders:{" "}
                                              {/* {
                                                viewSummary.total_number_of_orders
                                              } */}
                                            </div>
                                          </div>
                                          <div className="d-flex my-3">
                                            <i
                                              className="fa fa-pencil-square-o mt-1 px-1"
                                              aria-hidden="true"
                                            ></i>
                                            <div>
                                              Total Responded Quotes:
                                              {/* {
                                                viewSummary.total_responded_quote
                                              } */}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="modal-body">
                                        Business Decription:{" "}
                                        {viewSeller.businessDescription}
                                      </div>
                                      <div className="modal-body">
                                        Hear about Us: {viewSeller.hearAboutUs}
                                      </div>
                                      <div className="modal-body">
                                        Country: {viewSeller.country}
                                      </div>
                                      <div className="modal-body">
                                        Supply Capacity:{" "}
                                        {viewSeller.supplyCapacity}
                                      </div>
                                      <div className="modal-body">
                                        Year Established:
                                        {viewSeller.yearEstablished}
                                      </div>
                                      <div className="modal-body">
                                        Total Annual Revenue:{" "}
                                        {viewSeller.totalAnnualRevenue}
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

export default Sellers;
