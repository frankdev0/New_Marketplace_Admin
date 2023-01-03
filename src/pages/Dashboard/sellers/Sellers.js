import React, { useEffect, useMemo, useState } from "react";
import { Iconly } from "react-iconly";
import { Link } from "react-router-dom";
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

  const commentsData = useMemo(() => {
    let computedSellers = sellers;

    if (search) {
      computedSellers = computedSellers.filter(
        (comment) =>
          comment.LastName.toLowerCase().includes(search.toLowerCase()) ||
          comment.firstName.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedSellers.length);

    //currentPage Slice

    return computedSellers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [sellers, currentPage, search]);

  const getSellers = async () => {
    try {
      axios.get("/auth/users?role=SELLER").then((response) => {
        setSellers(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  };
  useEffect(() => {
    getSellers();
  }, []);

  const getSummary = async () => {
    try {
      axios.get("/dashboard/admin/buyer-activity-summary").then((response) => {
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

  const handleSellers = (e) => {
    if (e.target.value === "buyers") {
      axios.get("/auth/users?role=SELLER").then((response) => {
        setSellers(response.data.data);
        console.log("buyers", response.data.data);
      });
    } else if (e.target.value === "after-buyers") {
      axios
        .get("/auth/users?role=SELLER&hearAboutUs=AFCTCA")
        .then((response) => {
          setSellers(response.data.data);
          console.log("after-buyers", response.data.data);
        });
    } else if (e.target.value === "oldMutual-buyers") {
      axios
        .get("/auth/users?role=SELLER&hearAboutUs=OLD_MUTUAL")
        .then((response) => {
          setSellers(response.data.data);
          console.log("oldMutual-buyers", response.data.data);
        });
    }
  };

  const showSeller = (sellerID) => {
    setViewLoader(true);
    axios.get(`/auth/users/user/${sellerID}`).then((response) => {
      setViewSeller(response.data.data);
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
      <div className="grid-container">
        <header className="header">
          <div className="header__message">
            <h2>Hello Erhun Abbe</h2>
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
          <div className="row main-overview">
            <div className="col-4 overview-card">
              <div>
                <h2>Total Sellers</h2>
                {/* <p>Detailed transaction history is on the order page</p> */}
                <div className="d-flex justify-content-between mt-4">
                  <h3>10,000</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="my-2">
            <select
              className="form-control"
              onChange={handleSellers}
              style={{ width: "10rem", borderRadius: "10px" }}
            >
              <option>Select Seller</option>
              <option value="buyers">All Sellers</option>
              <option value="oldMutual-buyers">OldMutual Sellers</option>
              <option value="after-buyers">After Sellers</option>
            </select>
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
                      <th scope="col">No of Products</th>
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

                            <td>25</td>
                            <td>
                              <div className="text-warning">{seller.email}</div>
                            </td>
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
                                  <div className="modal-dialog">
                                    <div className="modal-content">
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
                                      <div className="modal-body">
                                        Name:{viewSeller.firstName}{" "}
                                        {viewSeller.LastName}
                                      </div>
                                      <div className="modal-body">
                                        phoneNumber: {viewSeller.phoneNumber}
                                      </div>
                                      <div className="modal-body">Address:</div>
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
                                          className="btn btn-primary"
                                        >
                                          Save changes
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
