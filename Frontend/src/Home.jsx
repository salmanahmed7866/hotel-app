import Items from './Item/Items.jsx';
// import data_product from "./assets/data.js"
import "./Home.css"
import { useContext, useEffect, useState } from 'react';
import { ShopContext } from './ShopContext';
import { CartContext } from './ContextProvider/CartContext';
export default function Home() {
    const { productData, loading } = useContext(ShopContext);
    const { refreshCartCount } = useContext(CartContext);
    useEffect(() => {
        refreshCartCount();
    }, []);


return (
    <>
        <div className='popular'>
            <h1>Popular</h1>
            <div className='popular-items'>{productData.map((items, i) => {
                return <Items key={i} id={items._id} name={items.name} image={items.image} old_price={items.old_price} new_price={items.new_price} />
            })}</div>
        </div>
        <div>
        </div>
    </>
)

}
