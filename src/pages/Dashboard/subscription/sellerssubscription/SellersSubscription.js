import React from "react";
import { Link } from "react-router-dom";
import { Iconly } from "react-iconly";
import SellersSidebar from "../../dashboardComponents/SideBar";

const SellersSubscription = () => {
  return (
    <>
      <div className="grid-container">
        <header className="header">
          <div className="header__message">
            <h2>Hello Erhun Abbe</h2>
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
          <h1 className="section-title">Activity Summary</h1>
          <div className="main-overview">
            <div className="overview-card">
              <div>
                <h2>Total Basic</h2>
                {/* <p>Detailed transaction history is on the order page</p> */}
                <div class="d-flex justify-content-between mt-4">
                  <h3>10</h3>
                </div>
              </div>
            </div>
            <div className="overview-card">
              <div>
                <h2>Total Premium</h2>
                {/* <p>Detailed transaction history is on the order page</p> */}
                <div class="d-flex justify-content-between mt-4">
                  <h3>22</h3>
                </div>
              </div>
            </div>
          </div>

          <h1 className="section-title">Sellers Subscription</h1>
          <div className="main-overview">
            <div className="overview-card no-padding">
              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S/N</th>
                      <th scope="col">Sellers Name</th>
                      <th scope="col">Plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0123456543</td>

                      <td>
                        <div className="text-warning">Pending</div>
                      </td>
                      <td>Basic</td>
                    </tr>
                    <tr>
                      <td>0123456543</td>

                      <td>
                        <div className="text-primary">Processing</div>
                      </td>
                      <td>view</td>
                    </tr>
                    <tr>
                      <td>0123456543</td>

                      <td>
                        <div className="text-success">Shipped</div>
                      </td>
                      <td>Premium</td>
                    </tr>
                    <tr>
                      <td>0123456543</td>

                      <td>
                        <div className="text-success">Delivered</div>
                      </td>
                      <td>Basic</td>
                    </tr>
                    <tr>
                      <td>0123456543</td>

                      <td>
                        <div className="text-success">Delivered</div>
                      </td>
                      <td>Premium</td>
                    </tr>
                    <tr>
                      <td>0123456543</td>

                      <td>
                        <div className="text-success">Delivered</div>
                      </td>
                      <td>Basic</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SellersSubscription;
