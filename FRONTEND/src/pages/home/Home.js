import React, { useContext,useEffect } from 'react';
import useGetproducts from '../../hooks/useGetproducts';
import Product from './Product';
import './style.css'
import { ShopContext } from '../../context/shopcontext';
import { Navigate } from 'react-router-dom';

function Home() {
  const products = useGetproducts();
  // function clearLocalStorage() {
  //   localStorage.clear();
  // }

  // useEffect(() => {
  //     window.addEventListener('beforeunload', clearLocalStorage);

  //     return () => {
  //       window.removeEventListener('beforeunload', clearLocalStorage);
  //     };
  //   }, []);
  if (!products) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className='shop'>
      <div className='products'>
        {products.map(product => (
          <div key={product.id}>
            <Product product={product}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
