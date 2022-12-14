import React from "react";
import { Iconly } from "react-iconly";
import { Link } from "react-router-dom";
import SellersSidebar from "../dashboardComponents/SideBar";
import peer from "../../../assets/img/pear.png";
import box1 from "../../../assets/img/box1.png";
import box2 from "../../../assets/img/box2.png";
import box3 from "../../../assets/img/box3.png";

const ViewProduct = () => {
  return (
    <>
      <div>
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
              <button className="btn btn-success mx-3 px-5">Approve</button>
              <button className="btn btn-danger px-5">Decline</button>
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
                      <div className="box">
                        <img src={box1} alt="box1" className="box" />
                      </div>
                      <div className="box mx-1">
                        <img src={box2} alt="box1" className="box mx-1" />
                      </div>
                      <div className="box">
                        <img src={box1} alt="box1" className="box" />
                      </div>
                      <div className="box mx-1">
                        <img src={box3} alt="box1" className="box mx-1" />
                      </div>
                      <div className="box">
                        <img src={box1} alt="box1" className="box" />
                      </div>
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
                        <p className="mx-3">Price</p>
                        <p className="description-value">USD 500</p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">MOQ</p>
                        <p className="description-value">100MT</p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Country of Origin</p>
                        <p className="description-value">Uganda</p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Lead Time [Min]</p>
                        <p className="description-value">2 weeks</p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Lead Time [Max]</p>
                        <p className="description-value">4 weeks</p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Supply Capacity</p>
                        <p className="description-value">10,000 MT/ Monthly</p>
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
                        <p className="mx-3">Type</p>
                        <p className="description-value">
                          Scorched, Sun Scorched
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Color</p>
                        <p className="description-value">
                          Creamy-white, Light yellow
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Grade</p>
                        <p className="description-value">W180, 240, 320, 450</p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Moisture</p>
                        <p className="description-value">10%</p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Category</p>
                        <p className="description-value">Food & Beverage</p>
                      </div>
                      <div className="d-flex">
                        <p className="mx-3">Sub-Category</p>
                        <p className="description-value">Fresh Fruits</p>
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
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
