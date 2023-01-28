import React, { useContext, useEffect, useMemo, useState } from "react";
import { Iconly } from "react-iconly";
import { Link } from "react-router-dom";
import { AppContext } from "../../../components/AppState";
import { axios } from "../../../components/baseUrl";
import PaginationComponent from "../../../components/PaginationComponent";
// import LeftNavBar from "../../../components/LeftNavBar";
import { ProtectedRoutes } from "../../../components/ProtectedRoutes";
import Search from "../../../components/Search";
import SellersSidebar from "../dashboardComponents/SideBar";
import "./productlisting.css";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const ITEMS_PER_PAGE = 5;

  const { user, activitySummary } = useContext(AppContext);
  console.log("this is my user", user);

  const getProducts = async () => {
    try {
      axios.get("/product").then((response) => {
        setProducts(response.data.data);
        console.log(response.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const commentsData = useMemo(() => {
    let computedProducts = products;

    if (search) {
      computedProducts = computedProducts.filter(
        (comment) =>
          comment.productName.toLowerCase().includes(search.toLowerCase()) ||
          comment.createdBy.firstName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          comment.status.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedProducts.length);

    //currentPage Slice

    return computedProducts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [products, currentPage, search]);

  // const itemsPerPage = 5;

  // useEffect(() => {
  //   const endOffset = itemOffset + ITEMS_PER_PAGE;
  //   setProducts(products.slice(itemOffset, endOffset));
  //   setPageCount(Math.ceil(products.length / ITEMS_PER_PAGE));
  // }, [itemOffset, ITEMS_PER_PAGE]);

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * ITEMS_PER_PAGE) % products.length;
  //   setItemOffset(newOffset);
  // };

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
                  <Search
                    onSearch={(value) => {
                      setSearch(value);
                      setCurrentPage(1);
                    }}
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
            {/* <LeftNavBar handleLogout={handleLogout} /> */}
          </header>

          <SellersSidebar />

          <main className="main">
            <h1 className="section-title">Activity Summary</h1>
            <div className="main-overview">
              <div className="overview-card">
                <div>
                  <h2>Total Products</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div className="d-flex justify-content-between mt-4">
                    <h3>{activitySummary.total_number_of_products}</h3>
                  </div>
                </div>
              </div>

              <div className="overview-card">
                <div>
                  <h2>Total Approved Products</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div className="d-flex justify-content-between mt-4">
                    <h3>{activitySummary.total_number_of_approved_products}</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Total Dispaproved Products</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div className="d-flex justify-content-between mt-4">
                    <h3>
                      {activitySummary.total_number_of_disapproved_products}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="section-title">Latest Products</h1>
            <div className="main-overview">
              <div className="overview-card no-padding">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">S/N</th>
                        <th scope="col">Product ID</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Sellers Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commentsData &&
                        commentsData.map((product, index) => {
                          return (
                            <tr key={product.id}>
                              <th scope="row">{index + 1}</th>
                              <td>0123456543</td>
                              <td>
                                <div className="d-flex">
                                  {/* {product.productImages &&
                                    product.productImages.map((image) => {
                                      return (
                                        <div
                                          className="flex-shrink-0"
                                          key={image.id}
                                        >
                                          <img
                                            className="table-product-img"
                                            src={image.image}
                                            alt="..."
                                          />
                                        </div>
                                      );
                                    })} */}

                                  <div className="flex-grow-1 ms-3">
                                    <p>{product.productName}</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                {`${
                                  product.createdBy &&
                                  product.createdBy.firstName
                                } ${
                                  product.createdBy &&
                                  product.createdBy.LastName
                                }`}
                              </td>
                              {/* <td>{product.supplyCapacity}</td> */}
                              <td>
                                {product.productStatus === "PENDING" && (
                                  <div className="text-warning rounded-pill">
                                    PENDING
                                  </div>
                                )}
                                {product.productStatus === "APPROVED" && (
                                  <div className="text-success rounded-pill">
                                    APPROVED
                                  </div>
                                )}
                                {product.productStatus === "DISAPPROVED" && (
                                  <div className="text-danger rounded-pill">
                                    DECLINED
                                  </div>
                                )}
                              </td>
                              {/* <td>
                                <div className="text-danger">
                                  {product.productStatus}
                                </div>
                              </td> */}
                              <td>
                                <Link to={`/view-product/${product.id}`}>
                                  view
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>

                    {/* <MyPagination
                      pageCount={pageCount}
                      handlePageClick={handlePageClick}
                    /> */}
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
      </div>
    </>
  );
};

export default ProtectedRoutes(ProductListing, ["SUPER_ADMIN", "BUYER"]);
