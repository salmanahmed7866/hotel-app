import React, { useState } from 'react'
import "./EmailVerification.css"
import { useNavigate } from 'react-router-dom'
import spinner from "../assets/images/spinner.gif"

const EmailVerification = () => {
    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const verifyemail = async () => {
        setLoading(true)
        const url = `${import.meta.env.VITE_BACKEND_URL}/user/verifyEmail`
        const response = await fetch(url, { method: "post", body: JSON.stringify({ code }), headers: { "content-type": "application/json" } })
        if (response.ok) {
            setTimeout(() => { setLoading(false)
                navigate("/")
             }, 2000)
           
            console.log("successfully verified")
            
        }
        else {
            setTimeout(() => { setLoading(false) }, 3000)

            console.log("Not Verified verified")
        }
    }


    return (
        <>
            <div className={`email-verification-container ${loading ? "blur" : ""}`}>
                <h1>Verify Email</h1>
                <div className='input-button-section'>
                    <input type="number" name="email" onChange={(e) => { setCode(e.target.value) }} placeholder='Verification Code' />
                    <button className='verify-button' onClick={() => verifyemail()} >Verify Email</button>
                </div>

            </div>
            {loading && (
                <div className='overlay'>
                    {/* <img src={spinner} alt='loading' /> */}
                </div>
            )}
        </>
    )
}

export default EmailVerification