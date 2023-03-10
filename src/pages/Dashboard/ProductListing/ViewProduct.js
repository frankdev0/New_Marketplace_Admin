import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SellersSidebar from "../dashboardComponents/SideBar";
// import peer from "../../../assets/img/pear.png";
import { axios } from "../../../components/baseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";

const ViewProduct = () => {
  const [viewProduct, setViewProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState();
  const [productImage, setProductImage] = useState([]);
  const [productSpecification, setProductSpecification] = useState([]);
  console.log("productSpecification", productSpecification);
  const { productId } = useParams();

  const navigate = useNavigate();

  const showProduct = () => {
    setLoading(true);
    axios.get(`/product/${productId}`).then((response) => {
      setViewProduct(response.data.data);
      const arr = Object.entries(response.data.data.productSpecification);
      setProductSpecification(arr);
      setProductImage(response.data.data.productImages);
      const mainImage = response.data.data.productImages[0].image;
      setCurrentImage(mainImage);
      console.log("my product", response.data.data);
      setLoading(false);
    });
  };

  const displayImageHandler = (imageIndex) => {
    setCurrentImage(productImage[imageIndex].image);
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
                      src={currentImage}
                      alt="peer"
                      className="rectangle"
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                    <div className="d-flex mt-2 other-images">
                      {viewProduct.productImages &&
                        viewProduct.productImages.map((image, index) => {
                          return (
                            <div
                              className="box mx-1"
                              key={image.id}
                              onClick={(e) => displayImageHandler(index)}
                            >
                              <img
                                src={image.image}
                                alt="box1"
                                className="box mx-1"
                                style={{ width: "100%", objectFit: "cover" }}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div
                    className="col-5 mx-auto"
                    style={{ width: "371px", height: "208px" }}
                  >
                    <h6>Product Information</h6>
                    <div className="product-info my-2 ">
                      <div className="d-flex">
                        <p className="mx-3">Seller's Name: </p>
                        <p className="description-value">
                          {viewProduct.createdBy &&
                            viewProduct.createdBy.firstName}{" "}
                          {viewProduct.createdBy &&
                            viewProduct.createdBy.LastName}
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Product Name:</p>
                        <p className="description-value">
                          {viewProduct.productName}
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">MOQ:</p>
                        <p className="description-value">100MT</p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Country of Origin:</p>
                        <p className="description-value">
                          {viewProduct.countryOfOrigin}
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Lead Time [Min]:</p>
                        <p className="description-value">
                          {viewProduct.minDuration} weeks
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Lead Time [Max]</p>
                        <p className="description-value">
                          {viewProduct.maxDuration} weeks
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Supply Capacity:</p>
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
                        <p className="mx-3">Product Specification</p>
                        <p className="description-value">
                          {productSpecification[0][0]}:{" "}
                          {productSpecification[0][1]}
                        </p>
                      </div>

                      <div className="d-flex">
                        <p className="mx-3">Created At</p>
                        <p className="description-value">
                          {dayjs(viewProduct.createdAt).format("D MMMM YYYY")}
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Product Status</p>
                        <div className="description-value">
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
                        </div>
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
                      ToFa has developed partnerships with Vietnam???s top
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
