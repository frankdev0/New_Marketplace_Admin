import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Authentication from "./pages/Authentication/Authentication";
import BuyersRegistration from "./pages/Authentication/BuyersRegistration";
import SellersRegistration from "./pages/Authentication/SellersRegistration";
import PhoneVerification from "./pages/Authentication/PhoneVerification";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import Login from "./pages/Authentication/Login";
import ResetPassword from "./pages/Authentication/ResetPassword";

import SellersDashboard from "./pages/Dashboard/Dashboard";
import SellersOrder from "./pages/Dashboard/transaction/SellersOrder";
import EmailVerification from "./pages/Authentication/EmailVerification";
import SellersDispute from "./pages/Dashboard/disputes/SellersDispute";
import Categories from "./pages/Dashboard/categories/Categories";
import Buyers from "./pages/Dashboard/buyer/Buyers";
import Sellers from "./pages/Dashboard/sellers/Sellers";
import SellersSubscription from "./pages/Dashboard/subscription/sellerssubscription/SellersSubscription";
import Settings from "./pages/Dashboard/settings/Settings";
import SellersRfqs from "./pages/Dashboard/rfq/SellersRfqs";
import ProductListing from "./pages/Dashboard/ProductListing/ProductListing";
import Dispute from "./pages/Dashboard/disputes/Dispute";
import ViewOrders from "./pages/Dashboard/transaction/ViewOrders";
import ViewProduct from "./pages/Dashboard/ProductListing/ViewProduct";
import ViewRfq from "./pages/Dashboard/rfq/ViewRfq";
import CreateCategories from "./pages/Dashboard/categories/CreateCategories";
import Overview from "./pages/Dashboard/overview/Overview";
import AppState from "./components/AppState";
import SubCategory from "./pages/Dashboard/categories/SubCategory";
import EditCategory from "./pages/Dashboard/categories/EditCategory";
import Unauthorized from "./pages/Dashboard/unauthorized/Unauthorized";

function App() {
  return (
    <AppState>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route exact path="/authentication" element={<Authentication />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/buyers-registration" element={<BuyersRegistration />} />
        <Route path="/sellers-registration" element={<SellersRegistration />} />

        <Route exact path="product-listing" element={<ProductListing />} />
        <Route path="/phone-verification" element={<PhoneVerification />} />
        <Route path="/verify-email/:email" element={<EmailVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/set-password/:userID/:token"
          element={<ResetPassword />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/login/:userId/:token" element={<Login />} />

        <Route path="/" element={<SellersDashboard />} />

        <Route
          exact
          path="/sellers-subscription"
          element={<SellersSubscription />}
        />
        <Route path="/buyers" element={<Buyers />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/transactions" element={<SellersOrder />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/create-category" element={<CreateCategories />} />
        <Route path="/edit-category/:categoryId" element={<EditCategory />} />
        <Route path="/sub-category" element={<SubCategory />} />
        <Route exact path="/rfqs" element={<SellersRfqs />} />
        <Route exact path="settings" element={<Settings />} />
        <Route path="/sellers-disputes" element={<SellersDispute />} />
        <Route path="/disputes" element={<Dispute />} />
        <Route path="/view-order/:orderId" element={<ViewOrders />} />
        <Route path="/view-product/:productId" element={<ViewProduct />} />
        <Route path="/view-rfq/:rfqId" element={<ViewRfq />} />

        <Route path="/overview" element={<Overview />} />
      </Routes>
    </AppState>
  );
}

export default App;
