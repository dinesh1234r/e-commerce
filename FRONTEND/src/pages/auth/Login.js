import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import '../auth/style.css'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../context/shopcontext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';


function Login(){
  const {setIsauth}=useContext(ShopContext)
  const [username,setUsername] =useState("")
  const [password,setPassword] =useState("")
  const navigate=useNavigate();
  if(localStorage.getItem('userinfo')&&localStorage.getItem('userID'))
  {
    navigate('/Home')
  }
  const handlesubmit=async(event)=>{
      event.preventDefault();
      const postData={
        username:username,
        password:password
      }
      axios.post('https://e-commerce-backend-l0au.onrender.com/user/login',postData)
      .then(response=>{
        if(response.data.message=='Login Successful')
        {
          localStorage.setItem('userID',response.data.customerId)
          localStorage.setItem('userinfo',response.data.jwt)
          alert(response.data.message)
          setIsauth(true)
          navigate('/Home')
        }
        else{
          alert(response.data)
        }
      })
      .catch(error=>{
         alert('Error in login page')
      })
      setUsername("")
      setPassword("")
  }
return (
  <div className='body'>
  <div className='box'>
    <div className='header'>
      <div className='text'>Login</div>
      <div className='underline'></div>
    </div>
      <form className='inputs'>
          <div className='input'>
          <label htmlFor='username' ><FontAwesomeIcon className='icon' icon={faUser} /></label>
          <input type='text' id='username' value={username} onChange={(event)=>setUsername(event.target.value)} />
          </div>
          <div className='input'>
          <label htmlFor='password'><FontAwesomeIcon className='icon' icon={faLock} /></label>
          <input type='password' value={password} onChange={(event)=>setPassword(event.target.value)} id='password'/>
          </div>
          <div className='submit'>
          <button className='submit' type='submit' onClick={handlesubmit}>Submit</button>
          </div>
      </form>
      <div className='register'>
      <div>If you don't have a account</div>
      <div className='register1' onClick={()=>navigate('/register')}>Register</div>
      </div>
      
      
  </div>
  {/* <ToastContainer/> */}
  </div>
)
}
export default Login
