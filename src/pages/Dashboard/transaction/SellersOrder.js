import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Iconly } from "react-iconly";
import SellersSidebar from "../dashboardComponents/SideBar";
import { axios } from "../../../components/baseUrl";
import { ProtectedRoutes } from "../../../components/ProtectedRoutes";
import Search from "../dashboardComponents/Search";
import PaginationComponent from "../../../components/PaginationComponent";
import { AppContext } from "../../../components/AppState";

const SellersOrder = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activitySummary, setActivitySummary] = useState("");
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 5;
  const [totalItems, setTotalItems] = useState(0);

  const { user } = useContext(AppContext);

  const navigate = useNavigate();

  const transactionData = useMemo(() => {
    let computedTransactions = transactions;

    if (search) {
      computedTransactions = computedTransactions.filter(
        (comment) =>
          comment.status.toLowerCase().includes(search.toLowerCase()) ||
          comment.product.productName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          comment.status.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedTransactions.length);

    //currentPage Slice

    return computedTransactions.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [transactions, currentPage, search]);

  const getTransactions = async () => {
    try {
      axios.get("/order").then((response) => {
        setTransactions(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      navigate("/unauthorized");
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    axios
      .get("/dashboard/admin/activity-summary")
      .then((response) => {
        setActivitySummary(response.data.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/unauthorized");
        setLoading(false);
      });
  }, []);

  if (user.role === "SUPER_ADMIN" && loading) {
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
                <h2>Total Transaction Revenue</h2>
                {/* <p>Detailed transaction history is on the order page</p> */}
                <div className="d-flex justify-content-between mt-4">
                  <h3>USD {activitySummary.total_transactions_revenue}</h3>
                </div>
              </div>
            </div>
            <div className="overview-card">
              <div>
                <h2>Total Orders</h2>
                {/* <p>Detailed transaction history is on the order page</p> */}
                <div className="d-flex justify-content-between mt-4">
                  <h3>
                    {activitySummary &&
                      activitySummary.total_delivered_orders +
                        activitySummary.total_pending_orders +
                        activitySummary.total_shipped_orders}
                  </h3>
                </div>
              </div>
            </div>
            <div className="overview-card">
              <div>
                <h2>Completed Orders</h2>
                {/* <p>Detailed transaction history is on the order page</p> */}
                <div className="d-flex justify-content-between mt-4">
                  <h3>{activitySummary.total_delivered_orders}</h3>
                </div>
              </div>
            </div>
          </div>

          <h1 className="section-title">All Orders</h1>
          <div className="main-overview">
            <div className="overview-card no-padding">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S/N</th>
                      <th>Porduct Name</th>
                      <th scope="col">Order No</th>
                      <th scope="col">Product Cost</th>
                      <th scope="col">Shipping Terms</th>

                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionData &&
                      transactionData.map((transaction, index) => {
                        return (
                          <tr key={transaction.id}>
                            <th scope="row">{index + 1}</th>
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
                                  <p>
                                    {transaction.product &&
                                      transaction.product.productName}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>USD {transaction.orderNumber}</td>
                            <td>USD {transaction.cost}</td>
                            <td>{transaction.incoterm}</td>
                            <td>
                              {transaction.status === "PENDING" && (
                                <div className="text-warning rounded-pill ">
                                  PENDING
                                </div>
                              )}
                              {transaction.status === "PROCESSING" && (
                                <div className="text-primary rounded-pill ">
                                  CONFIRMED
                                </div>
                              )}
                              {transaction.status === "SHIPPED" && (
                                <div className="text-info rounded-pill ">
                                  SHIPPED
                                </div>
                              )}
                              {transaction.status === "DELIVERED" && (
                                <div className="text-success rounded-pill ">
                                  DELIVERED
                                </div>
                              )}
                              {transaction.status === "CANCELLED" && (
                                <div className="text-gray rounded-pill ">
                                  CANCELLED
                                </div>
                              )}
                              {/* <div className="text-warning">
                                {transaction.status}
                              </div> */}
                            </td>
                            <td>
                              <Link to={`/view-order/${transaction.id}`}>
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

export default ProtectedRoutes(SellersOrder);
