import React, { useContext, useEffect, useState } from "react";
import { Iconly } from "react-iconly";
import { Link, useNavigate } from "react-router-dom";
import { axios } from "../../../components/baseUrl";
import SellersSidebar from "../dashboardComponents/SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../../components/AppState";

const Dispute = () => {
  const [disputes, setDisputes] = useState([]);
  const [viewDispute, setViewDispute] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AppContext);

  const navigate = useNavigate();

  const getDisputes = async () => {
    try {
      axios.get("/dispute").then((response) => {
        setDisputes(response.data.data);
        console.log(response.data.data);
        setLoading(false);
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
      setLoading(false);
    }
  };

  const UpdateDispute = async (id) => {
    try {
      const { data } = await axios.patch("/dispute", {
        status: "RESOLVED",
        disputeID: id,
      });
      setViewDispute(data.data);
      setTimeout(() => {
        navigate("/dispute");
      }, 2000);
      toast.success("DISPUTE UPDATED SUCCESSFULLY", {
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

  useEffect(() => {
    getDisputes();
  }, []);

  const showDispute = (disputeID) => {
    setLoading(true);
    axios.get(`/dispute/${disputeID}`).then((response) => {
      setViewDispute(response.data.data);
      console.log(response.data.data);
      setLoading(false);
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
      <div>
        <div className="grid-container">
          <ToastContainer />
          <header className="header">
            {/* <div className="header__message">
              <h2>All Buyers Dispute</h2>
            </div> */}
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
                  <h2>Total Disputes</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div className="d-flex justify-content-between mt-4">
                    <h3>10</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Total Resolved Disputes</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div className="d-flex justify-content-between mt-4">
                    <h3>22</h3>
                  </div>
                </div>
              </div>
              <div className="overview-card">
                <div>
                  <h2>Total Pending Disputes</h2>
                  {/* <p>Detailed transaction history is on the order page</p> */}
                  <div className="d-flex justify-content-between mt-4">
                    <h3>5</h3>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="section-title">Latest Dispute</h1>
            <div className="main-overview">
              <div className="overview-card no-padding">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">S/N</th>
                        {/* <th scope="col">Buyers Name</th> */}
                        <th scope="col">Subject</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {disputes && disputes.map((dispute) => { 
                      return (
                        <div> */}
                      {disputes &&
                        disputes.map((dispute, index) => {
                          return (
                            <tr key={dispute.id}>
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
                                    <p>{dispute.subject}</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                {dispute.status === "PENDING" && (
                                  <div className="text-warning rounded-pill">
                                    PENDING
                                  </div>
                                )}
                                {dispute.status === "RESOLVED" && (
                                  <div className="text-success rounded-pill">
                                    RESOLVED
                                  </div>
                                )}
                              </td>
                              <td>
                                <Link
                                  to="/n"
                                  type="button"
                                  onClick={(e) => showDispute(dispute.id)}
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                >
                                  view
                                </Link>
                              </td>
                              <td>
                                <div
                                  className="modal fade"
                                  id="exampleModal"
                                  tabIndex="-1"
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title"
                                          id="exampleModalLabel"
                                        >
                                          Disputes
                                        </h5>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>

                                      <main className="main">
                                        <div className="modal-body overview-card">
                                          <div className="my-5">
                                            <h5 className="heading">
                                              Subject:
                                            </h5>
                                            <span>
                                              Supply of Susbstandard Goods
                                            </span>
                                          </div>

                                          <p>
                                            ToFa has developed partnerships with
                                            Vietnam’s top suppliers to provide
                                            high-quality cashew nuts to markets
                                            worldwide. Vietnam has been
                                            producing cashews throughout the
                                            country since the early 1980s.
                                            Cashew nuts are grown in various
                                            regions in Vietnam, including Binh
                                            Phuoc, Dak Nong, Dong Nai, Binh
                                            Duong provinces. Particularly, Binh
                                            Phuoc province is known as the
                                            leading region for the growth of
                                            cashew nuts, constituting over 50%
                                            of the entire cashew nuts production
                                            in Vietnam. Tridge can provide two
                                            types of cashew nuts for export:
                                            kernel and processed nuts. With
                                            kernel cashew nuts, there are
                                            various sizes ranging from W180 to
                                            W500. For processed nuts,
                                            salt-roasted cashew is most popular.
                                            Moreover, Tridge can provide organic
                                            cashew kernel, which is gaining
                                            popularity in the market. he cashew
                                            nuts in Vietnam are based on size,
                                            color, and degree of rupture..
                                            Tridge can provide two types of
                                            cashew nuts for export: kernel and
                                            processed nuts. With kernel cashew
                                            nuts, there are various sizes
                                            ranging from W180 to W500. For
                                            processed nuts, salt-roasted cashew
                                            is most popular. Moreover, Tridge
                                            can provide organic cashew kernel,
                                            which is gaining popularity in the
                                            market. he cashew nuts in Vietnam
                                            are based on size, color, and degree
                                            of rupture. Cashew nuts are grown in
                                            various regions in Vietnam,
                                            including Binh Phuoc, Dak Nong, Dong
                                            Nai, Binh Duong provinces.
                                            Particularly, Binh Phuoc province is
                                            known as the leading region for the
                                            growth of cashew nuts, constituting
                                            over 50% of the entire cashew nuts
                                            production in Vietnam.{" "}
                                          </p>
                                        </div>
                                      </main>

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
                                          className="btn btn-success"
                                          onClick={() =>
                                            UpdateDispute(dispute.id)
                                          }
                                        >
                                          Mark as Resolved
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}

                      {/* <td>0123456543</td>
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
                              <p>Dried Hibiscus</p>
                            </div>
                          </div>
                        </td>
                        <td>USD 40,000</td>
                        <td>
                          <div className="text-warning">Pending</div>
                        </td>
                        <td>
                          <Link
                            to="/n"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            view
                          </Link>
                        </td>

                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  Disputes
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>

                              <main className="main">
                                <div className="modal-body overview-card">
                                  <div className="my-5">
                                    <h5 className="heading">Subject:</h5>
                                    <span>Supply of Susbstandard Goods</span>
                                  </div>

                                  <p>
                                    ToFa has developed partnerships with
                                    Vietnam’s top suppliers to provide
                                    high-quality cashew nuts to markets
                                    worldwide. Vietnam has been producing
                                    cashews throughout the country since the
                                    early 1980s. Cashew nuts are grown in
                                    various regions in Vietnam, including Binh
                                    Phuoc, Dak Nong, Dong Nai, Binh Duong
                                    provinces. Particularly, Binh Phuoc province
                                    is known as the leading region for the
                                    growth of cashew nuts, constituting over 50%
                                    of the entire cashew nuts production in
                                    Vietnam. Tridge can provide two types of
                                    cashew nuts for export: kernel and processed
                                    nuts. With kernel cashew nuts, there are
                                    various sizes ranging from W180 to W500. For
                                    processed nuts, salt-roasted cashew is most
                                    popular. Moreover, Tridge can provide
                                    organic cashew kernel, which is gaining
                                    popularity in the market. he cashew nuts in
                                    Vietnam are based on size, color, and degree
                                    of rupture.. Tridge can provide two types of
                                    cashew nuts for export: kernel and processed
                                    nuts. With kernel cashew nuts, there are
                                    various sizes ranging from W180 to W500. For
                                    processed nuts, salt-roasted cashew is most
                                    popular. Moreover, Tridge can provide
                                    organic cashew kernel, which is gaining
                                    popularity in the market. he cashew nuts in
                                    Vietnam are based on size, color, and degree
                                    of rupture. Cashew nuts are grown in various
                                    regions in Vietnam, including Binh Phuoc,
                                    Dak Nong, Dong Nai, Binh Duong provinces.
                                    Particularly, Binh Phuoc province is known
                                    as the leading region for the growth of
                                    cashew nuts, constituting over 50% of the
                                    entire cashew nuts production in Vietnam.{" "}
                                  </p>
                                </div>
                              </main>

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
                                  className="btn btn-success"
                                >
                                  Mark as Resolved
                                </button>
                              </div>
                            </div>
                          </div>
                        </div> */}

                      {/* }     
                       ))} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dispute;
