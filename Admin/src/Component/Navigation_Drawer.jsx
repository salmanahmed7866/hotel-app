import React from 'react'
import { Link } from "react-router-dom"
import { useState } from 'react'
import "./Navigation_Drawer.css"

const Navigation_Drawer = () => {
    return (
        <>
            <div className='left-menubar'>
                <div className='menubar-items'>
                    <div className='logo'>
                        E-commerce
                    </div>

                    <div className='drawer'>
                        <Link className='dashboard' to="/"> Dashboard </Link>
                        <Link className='product' to="/product">
                            Products
                        </Link>

                        <div className='Services'>
                            Services
                        </div>
                    </div>


                </div>
            </div>


            {/* <div className='vertical-line'>

        </div> */}
        </>
    )
}

export default Navigation_Drawer