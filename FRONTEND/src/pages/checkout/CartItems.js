import React, { useContext } from 'react'
import './style.css'
import { ShopContext } from '../../context/shopcontext'

function CartItems(props) {
  
    const {_id,productName,price,imageURL,stockQuantity}=props.product
    const{addToCart,removeFromCart,getCartItemCount,updateCartItemCount} =useContext(ShopContext)
  return (
    <div>
    <img src={imageURL} className='cartItem img'/>
    <div className='description'>
        <h3>{productName}</h3>
        <p>Price :₹{price}</p>
   </div>
   <div className='count-handler'>
        <button onClick={()=>removeFromCart(_id)}>-</button>
        <input type='number' value={getCartItemCount(_id)} onChange={(event)=>{
            updateCartItemCount(Number(event.target.value),_id)
        }}/>
        <button onClick={()=>addToCart(_id)}>+</button>
   </div>
   </div>
  )
}

export default CartItems