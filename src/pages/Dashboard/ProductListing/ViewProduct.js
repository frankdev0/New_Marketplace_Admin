import React, { useEffect, useState } from "react";
import { Iconly } from "react-iconly";
import { Link, useNavigate, useParams } from "react-router-dom";
import SellersSidebar from "../dashboardComponents/SideBar";
import peer from "../../../assets/img/pear.png";
import box1 from "../../../assets/img/box1.png";
import box2 from "../../../assets/img/box2.png";
import box3 from "../../../assets/img/box3.png";
import { axios } from "../../../components/baseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewProduct = () => {
  const [viewProduct, setViewProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();

  const navigate = useNavigate();

  const showProduct = () => {
    setLoading(true);
    axios.get(`/product/${productId}`).then((response) => {
      setViewProduct(response.data.data);
      console.log(response.data.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    showProduct();
  }, []);

  const UpdateProduct = async () => {
    try {
      const { data } = await axios.patch("/product/product-status", {
        productStatus: "APPROVED",
        productId,
      });
      setViewProduct(data.data);
      setTimeout(() => {
        navigate("/product-listing");
      }, 2000);
      toast.success("PRODUCT UPDATED SUCCESSFULLY", {
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
  const DeclineProduct = async () => {
    try {
      const { data } = await axios.patch("/product/product-status", {
        productStatus: "DISAPPROVED",
        productId,
      });
      setViewProduct(data.data);
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
      <div>
        <ToastContainer />
        <div className="grid-container">
          <header className="header">
            <div className="header__message">
              <h2>Product Details</h2>
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
            <div
              className="d-flex flex-end my-3"
              style={{ justifyContent: "right" }}
            >
              <button
                className="btn btn-dark mx-3 px-5"
                onClick={UpdateProduct}
              >
                Approve
              </button>
              <button className="btn btn-warning px-5" onClick={DeclineProduct}>
                Decline
              </button>
            </div>
            <div className="main-overview">
              <div className="overview-card">
                <div
                  className="row"
                  style={{ textAlign: "left", width: "100%" }}
                >
                  <div className="col-2" style={{ width: "250px" }}>
                    <img
                      src={peer}
                      alt="peer"
                      className="rectangle"
                      style={{ width: "100%" }}
                    />
                    <div className="d-flex mt-2 mx-auto other-images">
                      {viewProduct.productImages &&
                        viewProduct.productImages.map((image) => {
                          return (
                            <div className="box mx-1" key={image.id}>
                              <img
                                src={image.image}
                                alt="box1"
                                className="box mx-1"
                              />
                            </div>
                          );
                        })}

                      {/* <div className="box">
                        <img src={box1} alt="box1" className="box" />
                      </div>
                      <div className="box mx-1">
                        <img src={box3} alt="box1" className="box mx-1" />
                      </div>
                      <div className="box">
                        <img src={box1} alt="box1" className="box" />
                      </div> */}
                    </div>
                    Product Pic
                  </div>

                  <div
                    className="col-5 mx-auto"
                    style={{ width: "371px", height: "208px" }}
                  >
                    <h6>Product Information</h6>
                    <div className="product-info">
                      <div className="d-flex">
                        <p className="mx-3">Product Name</p>
                        <p className="description-value">
                          {viewProduct.productName}
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">MOQ</p>
                        <p className="description-value">100MT</p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Country of Origin</p>
                        <p className="description-value">
                          {viewProduct.countryOfOrigin}
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Lead Time [Min]</p>
                        <p className="description-value">
                          {viewProduct.minDuration}
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Lead Time [Max]</p>
                        <p className="description-value">
                          {viewProduct.maxDuration}
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Supply Capacity</p>
                        <p className="description-value">
                          {viewProduct.supplyCapacity}{" "}
                          {viewProduct.unitForSupplyCapacity}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-5 mx-auto"
                    style={{ width: "371px", height: "208px" }}
                  >
                    <h6>Available Specification</h6>
                    <div className="product-info" style={{ textAlign: "left" }}>
                      <div className="d-flex">
                        <p className="mx-3">Size</p>
                        <p className="description-value">
                          {viewProduct.productSpecification &&
                            viewProduct.productSpecification.size}
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Color</p>
                        <p className="description-value">
                          {viewProduct.productSpecification &&
                            viewProduct.productSpecification.color}
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Created At</p>
                        <p className="description-value">
                          {viewProduct.createdAt}
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Product Status</p>
                        <p className="description-value">
                          {viewProduct.productStatus === "PENDING" && (
                            <div className="text-warning rounded-pill">
                              PENDING
                            </div>
                          )}
                          {viewProduct.productStatus === "APPROVED" && (
                            <div className="text-success rounded-pill">
                              APPROVED
                            </div>
                          )}
                          {viewProduct.productStatus === "DISAPPROVED" && (
                            <div className="text-danger rounded-pill">
                              DECLINED
                            </div>
                          )}
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Category</p>
                        <p className="description-value">
                          {viewProduct.parentCategory &&
                            viewProduct.parentCategory.category}
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Sub-Category</p>
                        <p className="description-value">
                          {viewProduct.subCategory &&
                            viewProduct.subCategory.subCategory}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-5">
                  <div className="description-border">
                    <h6>Product Decsription</h6>
                  </div>
                  <div className="my-3">
                    <p>
                      ToFa has developed partnerships with Vietnam’s top
                      suppliers to provide high-quality cashew nuts to markets
                      worldwide. Vietnam has been producing cashews throughout
                      the country since the early 1980s. Cashew nuts are grown
                      in various regions in Vietnam, including Binh Phuoc, Dak
                      Nong, Dong Nai, Binh Duong provinces. Particularly, Binh
                      Phuoc province is known as the leading region for the
                      growth of cashew nuts, constituting over 50% of the entire
                      cashew nuts production in Vietnam. Tridge can provide two
                      types of cashew nuts for export: kernel and processed
                      nuts. With kernel cashew nuts, there are various sizes
                      ranging from W180 to W500. For processed nuts,
                      salt-roasted cashew is most popular. Moreover, Tridge can
                      provide organic cashew kernel, which is gaining popularity
                      in the market. he cashew nuts in Vietnam are based on
                      size, color, and degree of rupture.. Tridge can provide
                      two types of cashew nuts for export: kernel and processed
                      nuts. With kernel cashew nuts, there are various sizes
                      ranging from W180 to W500. For processed nuts,
                      salt-roasted cashew is most popular. Moreover, Tridge can
                      provide organic cashew kernel, which is gaining popularity
                      in the market. he cashew nuts in Vietnam are based on
                      size, color, and degree of rupture. Cashew nuts are grown
                      in various regions in Vietnam, including Binh Phuoc, Dak
                      Nong, Dong Nai, Binh Duong provinces. Particularly, Binh
                      Phuoc province is known as the leading region for the
                      growth of cashew nuts, constituting over 50% of the entire
                      cashew nuts production in Vietnam.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
          );
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
