import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import '../auth/style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../context/shopcontext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function Register(){
  const navigate=useNavigate()
  const [username,setUsername] =useState("")
  const [password,setPassword] =useState("")
  const handlesubmit=async(event)=>{
      event.preventDefault();
      const postData = {
        username: username,
        password: password
      };
      axios.post("https://e-commerce-backend-l0au.onrender.com/user/register",postData)
      .then(response=>{
        toast.success(response.data,{onClose:()=>{
            navigate('/')
          },autoClose:1500})
      })
      .catch(error=>{
        console.log('Error Occured in Register Form')
      })
      setUsername("")
      setPassword("")
  }
return (
  <div className='body'>
  <div className='box'>
      <div className='header'>
        <div className='text'>Register</div>
        <div className='underline'></div>
      </div>
      <form className='inputs'>
          <div className='input'>
          <label htmlFor='username' ><FontAwesomeIcon className='icon' icon={faUser} /></label>
          <input type='text' value={username} onChange={(event)=>setUsername(event.target.value)} id='username'/>
          </div>
          <div className='input'>
          <label htmlFor='password'><FontAwesomeIcon className='icon' icon={faLock} /></label>
          <input type='password' value={password} onChange={(event)=>setPassword(event.target.value)} id='password'/>
          </div>
          <div className='submit'>
          <button className='submit' type='submit' onClick={handlesubmit}>Submit</button>
          </div>
          
      </form>
  </div>
  <ToastContainer/>
  </div>
)
}

export default Register
