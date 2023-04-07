// import setting

import React from "react";
import { useContext } from "react";
import ReactDOM from "react-dom/client";
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';

// import components 

import HomeLayout from './pages/HomeLayout'
import SignIn from './components/sign in/Signin'
import SignUp from './components/sign up/Signup'
import CartPage from './pages/CartPage/CartPage'
import OrderandWishPage from "./pages/OrderandWishPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from './pages/SearchPage/SearchPage'
import AdminPageLayout from "./Admin/AdminPageLayout/AdminPageLayout";
import StorePageLayout from './Store/StorePageLayout/StorePageLayout'

//import contexts

import { AuthcontextProvider, AuthContext } from './Contexts/AuthcontextProvider'
import { ProductDetailContextProvider } from "./Contexts/ProductDetailContextProvider";
import { BuildStorecontextProvider } from "./Contexts/BuildStorecontextProvider";
import { ProductFilterProvider } from "./Contexts/ProductsSearchResulTSContext";
import { AuthStoreContext, AuthStorecontextProvide } from "./Contexts/AuthStorecontextProvider";
// import admin sections

import AddProductSection from "./Admin/Sections/AddProductSection/AddProductSection";
import DashobardSection from "./Admin/Sections/DashobardSection/DashobardSection";
import OrdersSection from "./Admin/Sections/OrdersSection/OrdersSection";
import UserSection from "./Admin/Sections/UserSection/UserSection";
import ProductsSection from "./Admin/Sections/ProductsSection/ProductsSection";


// import store section 
import ContactSection from "./Store/Sections/ContactSection/ContactSection";
import AboutSection from "./Store/Sections/AboutSection/AboutSection";
import HomeSection from "./Store/Sections/HomeSection/HomeSection";
import BuildStoreStartPage from "./BuildStore/Stages/BuildStoreStartPage/BuildStoreStartPage";

//import build store
import BuildStoreLayout from "./BuildStore/BuildStoreLayout/BuildStoreLayout";
import S1 from "./BuildStore/Stages/S1/S1";
import S2 from "./BuildStore/Stages/S2/S2";
import S3 from "./BuildStore/Stages/S3/S3";
import StoreLogin from "./BuildStore/StoreLogin/StoreLogin";
import { CartcontextProvider } from "./Contexts/CartcontextProvider";

import OrderActionSection from "./Admin/Sections/OrderActionSection/OrderActionSection";
import SettingSection from "./Admin/Sections/SettingSection/SettingSection";
import TopDeals from "./Store/Sections/TopDeals/TopDeals";
import CheckStores from "./pages/CheckStores/CheckStores";
import Checkout from "./components/Checkout/Checkout";







Axios.defaults.baseURL = 'http://localhost:8070'

function Main() {
  const userauth = useContext(AuthContext)
  const storeauth = useContext(AuthStoreContext)
  return (

    <>

      <BrowserRouter>
        <Routes>
          {userauth.isloggedin &&
            <>

              <Route path="/signin" element={<HomeLayout />} />
              <Route path="/signup" element={<HomeLayout />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/OrderWish' element={<OrderandWishPage />} />
            </>

          }

          {!userauth.isloggedin &&
            <>

              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path='/cart' element={<SignIn />} />
              <Route path='/OrderWish' element={<SignIn />} />
            </>

          }


          {/* admin routes   */}
          {storeauth.isloggedin &&
              <>
               
            <Route path="/admin/:id" element={<AdminPageLayout />} >
              <Route index element={<DashobardSection />} />
              <Route path="orders/order/:orderid/action" element={<OrderActionSection />} />
              <Route path="addproduct" element={<AddProductSection />} />
              <Route path="orders" element={<OrdersSection />} />
               
              <Route path="users" element={<UserSection />} />
              <Route path="products" element={<ProductsSection />} />
              <Route path="setting" element={<SettingSection />} />
            </Route>
            </>
          }
          {!storeauth.isloggedin &&

            <Route path="/admin/:id" element={<StoreLogin />} >
              <Route index element={<StoreLogin />} />
              <Route path="addcategory" element={<StoreLogin />} />
              <Route path="addproduct" element={<StoreLogin />} />
              <Route path="orders" element={<StoreLogin />} />
              <Route path="users" element={<StoreLogin />} />
              <Route path="products" element={<StoreLogin />} />
            </Route>
          }
          {/*end of admin routes  */}


          {/* store routes   */}
          <Route path="/store/:id" element={<StorePageLayout />} >
            <Route index element={<HomeSection />} />
            <Route path="contactus" element={<ContactSection />} />
            <Route path="aboutus" element={<AboutSection />} />
            <Route path="topdeals" element={<TopDeals />} />
            <Route path="users" element={<UserSection />} />
            <Route path="products" element={<ProductsSection />} />
          </Route>
          {/*end of store routes  */}

          
          <Route path="/check1" element={< Checkout/>} />
          <Route path="/checkstore" element={<CheckStores />} />
          <Route path="/buildstore" element={<BuildStoreLayout />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/storelogin" element={<StoreLogin />} />
          <Route path="/productdetail/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomeLayout />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}





const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartcontextProvider>
  <ProductFilterProvider>
  <AuthStorecontextProvide>
    <AuthcontextProvider>
      <ProductDetailContextProvider>
        <BuildStorecontextProvider>
          <Main />
        </BuildStorecontextProvider >
        {/* <ScrollToTop /> */}
      </ProductDetailContextProvider>
    </AuthcontextProvider>
  </AuthStorecontextProvide>
  </ProductFilterProvider>
</CartcontextProvider>
);
