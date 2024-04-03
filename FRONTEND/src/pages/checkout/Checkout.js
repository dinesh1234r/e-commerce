import React, { useContext } from 'react'
import { ShopContext } from '../../context/shopcontext'
import useGetproducts from '../../hooks/useGetproducts'
import CartItems from './CartItems'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

function Checkout() {
  
  const products=useGetproducts()
  const navigate=useNavigate();
  const {checkout,getCartItemCount,getTotalAmount} =useContext(ShopContext)
  const total=getTotalAmount()
  return (
    <div>
      <div className='cart'>
        <h1>
          Your Cart Items
        </h1>
      </div>
      <div className='cart'>
         {products.map((product)=>{
            if(getCartItemCount(product._id)>0)
            {
              return <CartItems product={product}/>
            }
         })}
      </div>
      {
        total>0?
        (<div className='checkout'>
          <p>Total Amount:{total.toFixed(1)}</p>
          <button onClick={()=>navigate('/Home')}>Continue Shopping</button>
          <button onClick={()=>checkout()}>Checkout</button>
      </div>):(<h1>Your Cart is Empty</h1>)
      }
    </div>
  )
}

export default Checkout