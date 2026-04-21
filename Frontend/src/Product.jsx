import { Link, useParams } from 'react-router-dom';
import ProductDisplay from './ProductDisplay';
import { useContext } from 'react';
import { ShopContext } from './ShopContext';


const Product = () => {
    const {productData} = useContext(ShopContext);
    const{ productId} = useParams();
    console.log("Product Id",productId)
    const product = productData.find((e) => e._id === productId )
      console.log("Product data",product)
    return (
        <div>
            <h1>Product </h1>
            <ProductDisplay product={product} />
        </div>
    )

}

export default Product