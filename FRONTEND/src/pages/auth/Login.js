import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import '../auth/style.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../context/shopcontext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
      axios.post('http://localhost:9000/user/login',postData)
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
  <div className='auth'>
  <div className='auth-container'>
      <h1 >Login</h1>
      <form>
          <div className='form-group'>
          <label htmlFor='username' >UserName:</label>
          <input type='text' id='username' value={username} onChange={(event)=>setUsername(event.target.value)} />
          </div>
          <div>
          <label htmlFor='password'>Password:</label>
          <input type='password' value={password} onChange={(event)=>setPassword(event.target.value)} id='password'/>
          </div>
          <button type='submit' onClick={handlesubmit}>Submit</button>
      </form>
      <p>If you don't have a account</p>
      <button onClick={()=>navigate('/register')}>Register</button>
      
  </div>
  {/* <ToastContainer/> */}
  </div>
)
}
export default Login