import { Link } from 'react-router-dom';
import "./Navbar.css"
import { useContext, useState } from 'react';
import cart_icon from "../assets/cart_icon.png"
import { CartContext } from "../ContextProvider/CartContext"

const Navbar = () => {
    const { cartCount } = useContext(CartContext);
    const [menu, setMenu] = useState("shop");
    return (
        <>
            <div className='navbar'>
                <Link onClick={() => { setMenu("shop") }} to="/"> <h1>Nutrijenix </h1></Link>
                <ul className='nav-menu'>
                    <li ><Link onClick={() => { setMenu("shop") }} to="/"> Shop</Link>  {menu === "shop" ? <hr /> : <></>} </li>
                    <li ><Link onClick={() => { setMenu("women") }} to="/women"> Women </Link>{menu === "women" ? <hr /> : <></>}</li>
                    <li ><Link onClick={() => { setMenu("men") }} to="/men"> Men </Link>{menu === "men" ? <hr /> : <></>}  </li>
                    <li ><Link onClick={() => { setMenu("kids") }} to="/contact"> Contact</Link>  {menu === "kids" ? <hr /> : <></>}</li>

                </ul>
                <div className='nav-login-cart'>
                   <Link to="/signup"><h1>Login </h1></Link> 
                    <Link to="/cart"><img className='cart-icon' src={cart_icon} alt=""></img><span className="cart-badge">{cartCount}</span></Link>
                </div>

            </div>
        </>
    )
}

export default Navbar