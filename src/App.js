import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";





import ManagerSportswearView from "./components/admin/view/ManagerSportswearView";
import IndexAdminView from "./components/admin/view/IndexAdminView";
import IndexWebsiteView from "./components/website/view/IndexWebsiteView";
import SportswearDetailView from "./components/website/view/SportswearDetailView";

import CartView from "./components/customer/view/CartView";

import CheckoutView from "./components/customer/view/CheckoutView";

import OrderView from "./components/customer/view/OrderView";
import ManagerOrderAdminView from "./components/admin/view/ManagerOrderAdminView";
import ModuleProfile from "./components/customer/module/ModuleProfile";
import ProfileView from "./components/customer/view/ProfileView";
import RegisterPage from "./components/auth/RegisterPage";
import ManagerUserView from "./components/admin/view/ManagerUserView";
import Chatbot from "./components/admin/module/chatbot";
import TestChart from "./components/admin/module/TestChart";




function App() {


  return (

    <BrowserRouter>
      <div className="App">

        <Routes>

          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/home" element={<IndexWebsiteView />} />
          <Route exact path="/home/detail/:sportswearId" element={<SportswearDetailView />} />

          <Route exact path="/manager" element={<IndexAdminView />} />
          <Route exact path="/manager/user" element={<ManagerUserView />} />
          <Route exact path="/manager/sportswear" element={<ManagerSportswearView />} />
          <Route exact path="/manager/order" element={<ManagerOrderAdminView />} />
          <Route exact path="/cart-user" element={<CartView />} />
          <Route exact path="/checkout" element={<CheckoutView />} />
          <Route exact path="/order" element={<OrderView />} />
          <Route exact path="/profile" element={<ProfileView />} />
          <Route exact path="/test" element={<TestChart />} />
        </Routes>

      </div>

    </BrowserRouter>
  )
}
export default App;