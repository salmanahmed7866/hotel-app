
import { useContext } from "react"
import Items from "../Item/Items"
import { ShopContext } from "../ShopContext"
import "./ShopCategory.css"
import dropdown from "../assets/dropdown_icon.png"


const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
    return (
        <>
            <div className="shop-category">
               <img className="shop-banner" src={props.banner} alt="" />
              <div className="shopcategory-indexsort"><p><span>showing 1-12</span> out of 26 product</p>
              <div className="shopcategory-sort">
                sort bt <img src={dropdown} alt="" />
              </div>
              </div>
                 <div>
                <div className="shop-category-items"> {all_product.map((e, i) => {
                    if (props.category === e.category) {
                        return <Items key={i} id={e.id} name={e.name} image={e.image} old_price={e.old_price} new_price={e.new_price} />
                    }
                    else {
                        return null;
                    }

                })}</div>
            </div>
            </div>
           

        </>
    )

}

export default ShopCategory