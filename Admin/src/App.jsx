import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import './App.css'
import Product from './Pages/Product/Product.jsx'
import Navigation_Drawer from './Component/Navigation_Drawer.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className='app-layout'>
          <Navigation_Drawer />
          <div className='app-main-content'>
            <Routes>

              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/product" element={<Product />}></Route>
            </Routes>
          </div>

        </div>


      </BrowserRouter>
    </>
  )
}

export default App
