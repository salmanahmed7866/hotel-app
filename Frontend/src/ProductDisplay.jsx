import './ProductDisplay.css'
import star_icon from "./assets/star_icon.png";
import fade_star_icon from "./assets/star_dull_icon.png";
import { useContext, useState } from 'react';
import { Link } from 'react-router';
import Cart from './Cart/Cart';
import { CartContext } from './ContextProvider/CartContext';


const ProductDisplay = (props) => {

    const { refreshCartCount } = useContext(CartContext);
    const { product } = props;
    const sizes = ["S", "M", "L", "XL", "XXL"];
    const [selectedSize, setSelectedSize] = useState(sizes[0]);
    const addToCart = async (userId, productId, quantity) => {
        const url = "http://localhost:3000/cart"
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({ userId, productId, quantity })
            })
            const data = await response.json();
            console.log("Cart updated:", data);
            return data;
        }
        catch (error) {
            console.error("Error adding to cart:", error);
        }

    }
    return (
        <>

            <div className="product-display">
                <div className="product-display-left">
                    <div className='product-display-img-list'>
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                    </div>
                    <div className='main_img'>
                        <img src={product.image} alt="Not Avaibale" />
                    </div>
                </div>

                <div className="productdisplay-right">
                    <h1>{product.name}</h1>
                    <div className='star-icon-list'>
                        <img src={star_icon} alt="" />
                        <img src={star_icon} alt="" />
                        <img src={star_icon} alt="" />
                        <img src={star_icon} alt="" />
                        <img src={fade_star_icon} alt="" />
                        <p>(122)</p>
                    </div>

                    <div className='productdisplay-right-prices'>
                        <div className='productdisplay-right-old-prices'> ${product.old_price}</div>
                        <div className='productdisplay-right-new-prices'> ${product.new_price}</div>
                    </div>

                    <div className='description'>
                        Alightweight, usually knitted,pulover shirt, cloase-fitting and a rpund neckline and short sleeves, worn as an undershirt or our garment.
                    </div>
                    <div><h1>Select Size</h1></div>
                    <div className='product-display-sizes'>
                        {sizes.map((size) => (
                            <button onClick={() => setSelectedSize(size)}
                                className={selectedSize === size ? 'active-size' : ""} key={size}
                            >
                                {size}
                            </button>))}
                    </div>
                    {/* <Link to="/cart" state={{ product }}><button className='addtocart' onClick={() => { }}>ADD TO CART</button></Link> */}

                    <button className='addtocart' onClick={async () => { await addToCart("65f1c8a9b4b92f1b2e6c1235", product._id, 1); refreshCartCount() }}>ADD TO CART</button>
                    <p className='category'><span>Category: </span>{product.category} </p>
                </div>
            </div>

        </>
    )
}
export default ProductDisplay