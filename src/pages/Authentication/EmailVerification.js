import React from "react";
import { useParams } from "react-router-dom";
import SiteLogo from "../../assets/img/logo.png";

export default function EmailVerification() {
  const { email } = useParams();

  return (
    <>
      <div>
        <section className="auth">
          <div className="auth-lhs">
            <div className="auth-lhs-header">
              <img className="site-logo" src={SiteLogo} alt="tofa" />
            </div>
          </div>
          <div className="auth-rhs">
            <div className="auth-rhs-header d-flex justify-content-between">
              <img
                className="site-logo mobile-only"
                src={SiteLogo}
                alt="tofa"
              />
            </div>
            <div className="auth-rhs-content d-flex align-items-center">
              <div className="rhs-inner">
                <h2>Success</h2>
                <p className="phone-v-inst">
                  You followed all steps and have successfully created your
                  Account.
                </p>
                <div className="auth-account-wrap">
                  <p>
                    Please verify your email address in order to access your
                    Tofa account. We sent an email to {email}. To continue,
                    please check your inbox and verify your email address.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
