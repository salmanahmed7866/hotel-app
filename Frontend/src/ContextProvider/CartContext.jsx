import React, { createContext, useContext, useState } from 'react'


export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const [datas, setDatas] = useState(null);

    const userId = "65f1c8a9b4b92f1b2e6c1235"; // temp
    const refreshCartCount = async () => {
        try {
            const url = `http://localhost:3000/cart/${userId}`
            const response = await fetch(url, {
                method: "get",
                headers: { "Content-Type": "application/json" }
            })

            const data = await response.json();
            console.log("CArt DAta", data)
            setDatas(data)
            if (!data || !data.items) {
                setCartCount(0)
                return;
            }

            const total = data.items.reduce((sum, item) => sum + item.quantity, 0)
            setCartCount(total)
        } catch (e) {
            console.error("CartCount Error", 3)
        }
    }
    return (
        <CartContext.Provider value={{ cartCount, datas, refreshCartCount }}> {children}</CartContext.Provider>
    )
}

export default CartContextProvider