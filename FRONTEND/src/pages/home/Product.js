import React, { useContext } from 'react'
import './style.css'
import { ShopContext } from '../../context/shopcontext';

function Product(props) {
    const {_id,productName,price,description,imageURL,stockQuantity}=props.product;
    const {addToCart,getCartItemCount}=useContext(ShopContext)
    const count=getCartItemCount(_id);
  return (<div className='product'>
    <img src={imageURL} />
    <div className='description'>
        <h3>{productName}</h3>
        <p>{description}</p>
        <p>Price :₹{price}</p>
    </div>
    <button className='addToCartBttn' onClick={()=> addToCart(_id)}>Add to Cart {count>0?<>({count})</>:<></>}</button>
    <div className='stock-quantity'>
      {stockQuantity>0?<p>Availiable:{stockQuantity} Items left</p>:<p>Out of Stock</p>}
    </div>
  </div>
    
  )
}

export default Product