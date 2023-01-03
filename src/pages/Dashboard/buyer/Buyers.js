import React, { useState, useEffect, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import { Iconly } from "react-iconly";
import SellersSidebar from "../dashboardComponents/SideBar";
import Search from "../dashboardComponents/Search";
import { axios } from "../../../components/baseUrl";
import PaginationComponent from "../../../components/PaginationComponent";
import { AppContext } from "../../../components/AppState";

const Buyers = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 5;
  const [totalItems, setTotalItems] = useState(0);
  const [viewBuyer, setViewBuyer] = useState([]);
  const [viewLoader, setViewLoader] = useState(false);

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

  const showBuyer = (buyerID) => {
    setViewLoader(true);
    axios.get(`/auth/users/user/${buyerID}`).then((response) => {
      setViewBuyer(response.data.data);
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
          <div className="row main-overview">
            <div className="col-4 overview-card">
              <div>
                <h2>Total Buyers</h2>
                {/* <p>Detailed transaction history is on the order page</p> */}
                <div className="d-flex justify-content-between mt-4">
                  <h3>10,000</h3>
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
                                  <div className="modal-dialog">
                                    <div className="modal-content">
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
                                      <div className="modal-body">
                                        Name: {viewBuyer.firstName}{" "}
                                        {viewBuyer.LastName}
                                      </div>
                                      <div className="modal-body">
                                        phoneNumber: {viewBuyer.phoneNumber}
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

export default Buyers;
