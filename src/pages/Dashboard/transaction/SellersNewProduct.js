import React from "react";
import SellersSidebar from "./SellersComponent/SellersSideBar";

const SellersNewProducts = () => {
  return (
    <>
      <div>
        <div className="grid-container">
          <header className="header">
            <div className="header__message">
              <h2>Create New Products</h2>
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
            <div className="main-overview">
              <div className="overview-card"></div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SellersNewProducts;
