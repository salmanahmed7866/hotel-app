import Home from './Home'
import Product from './Product'
import ContactUs from './ContactUs'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import banner_men from "./assets/banner_mens.png"
import women_banner from "./assets/banner_women.png"
import all_product from './assets/all_product'
import AboutUs from './AboutUs.jsx'
import ShopCategory from './ShopCategory/ShopCategory.jsx'
import Navbar from './Navbar/Navbar.jsx'
import Cart from './Cart/Cart.jsx'
import SignUp from './auth/SignUp.jsx'
import EmailVerification from './auth/EmailVerification.jsx'


export default function App() {
  return (
    <>
     <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/emailverification" element={<EmailVerification />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/men" element={<ShopCategory banner={banner_men} category='men' />} />
        <Route path="/women" element={<ShopCategory banner={women_banner} category='women' />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>

    </>
  )
}


