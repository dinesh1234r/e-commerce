import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import { ShopContext } from "../context/shopcontext";
import { Navigate } from "react-router-dom";

function NavBar() {
      const {money} =useContext(ShopContext)
      if(!localStorage.getItem('userinfo')||!localStorage.getItem('userID'))
      {
        return <div></div>
      }
      const logout=()=>{
        localStorage.clear()
      }
    return <div className="navbar">
    <div className="navbar-title">
        <h1>E-Shop</h1>
    </div>
    <div className="navbar-links">
        <Link to={"/Home"}>Home</Link>
        <Link to={"/purchased-items"}>Purchase-Items</Link>
        <Link to={"/checkout"}><FontAwesomeIcon icon={faShoppingCart} /></Link>
        <Link to={"/"} onClick={logout}>Logout</Link>
        <span>₹{money}</span>
        
    </div>
</div>
      // }
      // else{
      //   return <div></div>;
      // }
}

export default NavBar