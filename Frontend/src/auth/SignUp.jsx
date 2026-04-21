import React, { useState } from 'react'

import "./Signup.css"
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setformData] = useState({
        firstName: "", lastName: "", email: "", password: ""
    })
    const handleOnChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const signUp = async () => {
        const url = "http://localhost:3000/user/signup"

        try {
            setLoading(true);
            const response = await fetch(url, { method: "post", body: JSON.stringify(formData), headers: { "content-type": "application/json" } })
            const data = await response.json();
            if (response.ok) {
                setTimeout(() => {
                    setLoading(false);
                    navigate("/emailverification")
                }, 1000);

                console.log("Successfully Logged in", data)

            }
            else if (response.status === 400) {
                console.log("user Already Exist")
                alert("user Already Exist");
            }

        } catch (e) {
            console.error("Error:", error);
            alert("Something went wrong!");
        } 
    }
    return (

        <div className='signup'>
            <div className='signup-form'>
                <div className='signup-heading'><h2>SignUp</h2></div>
                <form action="">

                    <input type="text" name="firstName" value={formData.firstName} onChange={handleOnChange} placeholder='Firstname' />
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleOnChange} placeholder='Lastname' />
                    <input type="email" name="email" value={formData.email} onChange={handleOnChange} placeholder='Email' />
                    <input type="password" name="password" value={formData.password} onChange={handleOnChange} placeholder='Password' />
                </form>
                <button className="signup-btn" onClick={signUp} disabled={loading}>
                    {loading ? <div className="spinner"></div> : "Sign Up"}
                </button>

            </div>

        </div>
    )
}

export default SignUp