import React from "react";
import "./unauthorized.css";
import vector from "../../../assets/img/Vectorerror.png";
import square from "../../../assets/img/square.png";
import oval from "../../../assets/img/oval.png";
import hand2 from "../../../assets/img/hand2.png";
import hand from "../../../assets/img/hand.png";
import { Link } from "react-router-dom";
const Unauthorized = () => {
  return (
    <>
      <div className="unauthorized-container">
        <div className="container">
          {/* <p className="nf-text">UNAUTHORIZED</p> */}
          <div className="unauthorized-box">
            <div className="unauthorized-content">
              {" "}
              <h2>Oh No! access denied</h2>
              <p>
                You do not have access to this page. Let’s help you find your
                way back
              </p>
              <Link to="/">
                <button>Back to homepage</button>
              </Link>
            </div>
            <div className="unauthorized-image-container">
              <div className="unauthorized-image">
                <div className="vector">
                  <img src={vector} alt="..." />
                </div>
                <div className="square">
                  <img src={square} alt="..." />
                  <div className="notfound">
                    {/* <h2>404</h2> */}
                    <p>UNAUTHORIZED</p>
                  </div>
                </div>

                <div className="unathorized-oval">
                  <div className="oval">
                    <img src={oval} alt="..." />
                  </div>
                </div>
              </div>
              <div className="hands">
                <div className="hand2">
                  <img src={hand2} alt="" />
                </div>
                <div className="hand1">
                  <img src={hand} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
