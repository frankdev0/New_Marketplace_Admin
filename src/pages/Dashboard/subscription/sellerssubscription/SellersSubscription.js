import React, { useContext, useEffect, useState } from "react";
import { Iconly } from "react-iconly";
import SellersSidebar from "../../dashboardComponents/SideBar";
import { axios } from "../../../../components/baseUrl";
import { AppContext } from "../../../../components/AppState";

const SellersSubscription = () => {
  const [subscription, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AppContext);

  const getSubscriptions = async () => {
    try {
      axios.get("/subscription").then((response) => {
        setSubscriptions(response.data.data);
        console.log(response.data.data);
        setLoading(true);
      });
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

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
                <div className="d-flex justify-content-between mt-4">
                  <h3>10</h3>
                </div>
              </div>
            </div>
            <div className="overview-card">
              <div>
                <h2>Total Premium</h2>
                {/* <p>Detailed transaction history is on the order page</p> */}
                <div className="d-flex justify-content-between mt-4">
                  <h3>22</h3>
                </div>
              </div>
            </div>
          </div>

          <h1 className="section-title">Sellers Subscription</h1>
          <div className="main-overview">
            <div className="overview-card no-padding">
              <div className="table-responsive">
                <table className="table table-striped">
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

                      <td>Paschal Ojinnaka</td>
                      <td>Basic</td>
                    </tr>
                    <tr>
                      <td>0123456543</td>

                      <td>Victor Seller</td>
                      <td>view</td>
                    </tr>
                    <tr>
                      <td>0123456543</td>

                      <td>Erhun Abbe</td>
                      <td>Premium</td>
                    </tr>
                    <tr>
                      <td>0123456543</td>

                      <td>Victor Seller</td>
                      <td>Basic</td>
                    </tr>
                    <tr>
                      <td>0123456543</td>

                      <td>Paschal Ojinnaka</td>
                      <td>Premium</td>
                    </tr>
                    <tr>
                      <td>0123456543</td>

                      <td>Damilola Anifowoshe</td>
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
