import React, { useContext } from 'react'
import { ShopContext } from '../../context/shopcontext'
import { Navigate } from 'react-router-dom'
import '../purchased-item/style.css'

function Purchased() {
  const {addToCart,purchasedItems,getCartItemCount}=useContext(ShopContext)
  
  return (
    <div>
      <h1>Previously Purchased Item</h1>
      <div className='product-item'>
        {purchasedItems.map((item)=>{
          const count=getCartItemCount(item._id)
          return (<div>
            <h3>{item.productName}</h3>
            <img src={item.imageURL}/>
            <h3>{item.price}</h3>
            <button className='addToCartBttn' onClick={()=> addToCart(item._id)}>Purchase Again {count>0?<>({count})</>:<></>}</button>
          </div>);
        })}
      </div>
    </div>
  )
}

export default Purchased