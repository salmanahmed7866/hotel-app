import { createContext, useEffect, useState } from "react"

import all_product from "./assets/all_product";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [productData, setProductData] = useState([]);
    const [loading, setloading] = useState("true");
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {

        try {
           const url = "http://localhost:3000/image/getProduct"
            //   const url =` ${import.meta.env.BACKEND_URL}/image/getProduct`
            const response = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } })
            if (!response.ok) {
                throw new Error("Failed to fetch");
            }
            const data = await response.json();
            setProductData(data.reponse)
            console.log("Success:", data);
        } catch (error) {
            console.error(error);
        } finally { setloading(false) }
    }

    const contextValue = { productData, loading };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;