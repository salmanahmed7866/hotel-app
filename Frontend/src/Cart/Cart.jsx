import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import product_image from "../assets/cart_icon.png"
import "./Cart.css"
import { CartContext } from "../ContextProvider/CartContext";

const Cart = (props) => {
    const { datas } = useContext(CartContext);
    const [cartTotal, setCartTotal] = useState(0)

    const location = useLocation();
    const product = location.state?.product;
    const data = { email: "", firstName: "", lastName: "", city: "" }
    const [input, setInput] = useState(data);
    const handleInput = (event) => {
        console.log(event.target.value)
        setInput({ ...input, [event.target.name]: event.target.value })
    }
    useEffect(() => {
        let total=0
        datas.items.map((e) => {

            total += e.productId.new_price*e.quantity,
                console.log("Total payment", cartTotal)
                 setCartTotal(total);
        })
    }, [datas])
    const completeOrder = async () => {
        try {
            const url = "http://localhost:3000/checkout";
            const response = await fetch(url, {
                method: "post", body: JSON.stringify(input), headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!response.ok) {
                throw new Error("Response faild")
            }
            const result = await response.json();
            console.log("Success:", result);
        }
        catch (e) {
            console.log("Error:", e);
        }

    }
    return (
        <>
            <div className="checkout-container">
                <div className="checkout-left">
                    <div className="checkout-form">

                        <form action="">
                            <label htmlFor="email">Contact</label>
                            <input type="email" name="email" placeholder="Email or mobile number" onChange={handleInput} />
                            <label htmlFor="email">Delivery</label>
                            <div className="select-wrapper">
                                <label htmlFor="country">Country / Region</label>
                                <select id="country" name="country">
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="India">India</option>
                                </select>
                            </div>

                            <div className="name-row">
                                <input type="text" name="firstName" placeholder="First name" onChange={handleInput} />
                                <input type="text" name="lastName" placeholder="Last name" onChange={handleInput} />
                            </div>
                            <input type="address" name="address" placeholder="Address" />
                            <input type="text" name="apartment" placeholder="Apartment" />
                            <div className="city-postal-row">
                                <input type="text" name="city" placeholder="City" onChange={handleInput} />
                                <input type="text" name="postalcode" placeholder="Postal code" />
                            </div>
                            <input type="phone" name="phone" placeholder="Phone" />

                        </form>
                        <div className="shipping-method">
                            <div>Shipping Method</div>
                            <div className="shipping-method-type"> <span>Standard</span> Free</div>

                        </div>
                        <button className="complete-order-btn" onClick={completeOrder}>Complete Order </button>



                    </div>



                </div>
                <div className="checkout-right">
                    <div className="cart-product">
                        {datas.items.map((e) => (

                            <div className="cart-product-details">
                                <div className="product-img-wrapper">
                                    <img className="product-img" src={e.productId.image} alt="" /> <span className="badge">{e.quantity}</span>
                                </div>

                                <div className="cart-product-name">
                                    <div className="cart-product-title">{e.productId.name}</div>
                                    <div className="cart-product-serving">68 Servings </div>
                                </div>

                                <div className="cart-product-price">RS{e.productId.new_price}</div>
                            </div>
                        ))}
                        <div className="discount-code">
                            <input type="text" placeholder="Discount Code" />
                            <button className="discount-apply-button" onClick={() => { }}>Apply</button>
                        </div>
                        <div className="cart-calculate">
                            <div className="subtotal">
                                <div>Subtotal . 2 items</div>
                                <div>Rs 14000.0</div>
                            </div>
                            <div className="subtotal">
                                <div>Shipping</div>
                                <div>Free</div>
                            </div>
                            <div className="subtotal">
                                <div>Total</div>
                                <div>pkr Rs {cartTotal}</div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <hr></hr>
        </>
    )
}

export default Cart