import { createContext, useEffect, useState } from "react";
import useGetproducts from "../hooks/useGetproducts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext({});

export function ShopContextProvider(props) {
  const [purchasedItems,setPurchasedItems]=useState([])
  const navigate = useNavigate();
  const products = useGetproducts();
  const [cartItems, setCartItems] = useState({});
  const [money, setMoney] = useState(0); 
  const [isauth,setIsauth] =useState()

  const getCartItemCount = (itemId) => {
    if (itemId in cartItems) {
      return cartItems[itemId];
    }
    return 0;
  };
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: 1,
      }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }
  };
  const removeFromCart = (itemId) => {
    if (cartItems[itemId] == 0) {
      return 0;
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: cartItems[itemId] - 1,
      }));
    }
  };
  const updateCartItemCount = (newAmount, itemId) => {
    if (newAmount < 0) {
      alert("Stock must not contain negative number");
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: newAmount,
      }));
    }
  };
  const getTotalAmount = () => {
    let totalamount = 0;
    for (const item in cartItems) {
      let product = products.find((product)=>{
        return String(product._id)==item;
      });
      totalamount += cartItems[item] * product.price;
    }
    console.log(totalamount);
    return totalamount;
  };

  const checkout = async () => {
    try {
      console.log(localStorage.getItem("userID"));
      const body = {
        customerId: localStorage.getItem("userID"),
        cartItems: cartItems,
      };
      const response=await axios.post("https://e-commerce-backend-l0au.onrender.com/products/checkout", body,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('userinfo')}`
        }
    })
      if(response.data=='Checkout successful')
      {
        alert('checkout successfully');
        setCartItems({})
        navigate('/Home')
        balancemoney();
        prevpurchaseditem();
      }
      else
      {
        alert(response.data)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const balancemoney = async () => {
    try {
      const response = await axios.get(
        `https://e-commerce-backend-l0au.onrender.com/user/availablemoney/${localStorage.getItem(
          "userID"
        )}`
      );
      if(response.data=='Not a valid user'||response.data=='Error')
      {
        alert("error")
      }
      else
      {
        setMoney(response.data.money);
      }
      
    } catch (err) {
      alert("An error occurred");
    }
  };

  const prevpurchaseditem=async()=>{
      try{
        const response=await axios.get(
          `https://e-commerce-backend-l0au.onrender.com/products/purchaseditems/${localStorage.getItem(
            "userID"
          )}`
        );
        console.log(response.data)
        setPurchasedItems(response.data.purchasedItems)
      }
      catch(err){
        console.log(err)
      }
  }
  

  useEffect(() => {
    if(localStorage.getItem('userinfo')&&localStorage.getItem('userID'))
    {
      prevpurchaseditem();
      balancemoney();
    }
  },[localStorage.getItem('userinfo')&&localStorage.getItem('userID')]);

  const contextValue = {
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getCartItemCount,
    getTotalAmount,
    checkout,
    money,
    purchasedItems,
    isauth,
    setIsauth 
  };
  console.log('settting',money)

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
}