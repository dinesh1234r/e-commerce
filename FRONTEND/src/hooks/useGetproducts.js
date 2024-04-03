import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/shopcontext';
import { Navigate, useNavigate } from 'react-router-dom';

function useGetproducts() {
    const [products, setProducts] = useState([]);
    const navigate=useNavigate();
    
    const fetchProduct = async() => {
        axios.get('http://localhost:9000/products/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userinfo')}`
            }
        })
        .then(response => {
        if(response.data=='Token not found' || response.data=='Unauthorized')
        {
            navigate('/')
        }
        else
        {
            setProducts(response.data);
        }
         })
        .catch((error) => {
        console.error("Error fetching products:", error);
    });

    };

    // async function fetchProduct(){
        
        // await fetch("http://localhost:9000/products/",{
        //     method:"GET",
        //     headers:{
        //         'Content-Type':'application/json',
        //         'Authorization':`Bearer ${localStorage.getItem('userinfo')}`
        //     }

        // })
    //     .then(response=> response.json())
    //     .then(data=>{
            // if(data=='Token not found' || data=='Unauthorized')
            // {
            //    navigate('/');
            // }
            // else
            // {
            // setProducts(data)
            // }
    //     })
    //     .catch(err=>{
    //         console.log("Error");
    //     })

    // }

    useEffect(() => {
        // if(isauth)
        // {
            fetchProduct();
        // }
        
    }, []);

    return products;
}

export default useGetproducts;
