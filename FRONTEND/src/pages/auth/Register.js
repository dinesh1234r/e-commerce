import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import '../auth/style.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../context/shopcontext'


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
      axios.post("http://localhost:9000/user/register",postData)
      .then(response=>{
        alert(response.data)
      })
      .catch(error=>{
        console.log('Error Occured in Register Form')
      })
      setUsername("")
      setPassword("")
      navigate('/')
  }
return (
  <div className='auth'>
  <div className='auth-container'>
      <h1 >Register</h1>
      <form>
          <div className='form-group'>
          <label htmlFor='username' >UserName:</label>
          <input type='text' value={username} onChange={(event)=>setUsername(event.target.value)} id='username'/>
          </div>
          <div>
          <label htmlFor='password'>Password:</label>
          <input type='password' value={password} onChange={(event)=>setPassword(event.target.value)} id='password'/>
          </div>
          <button type='submit' onClick={handlesubmit}>Submit</button>
      </form>
  </div>
  </div>
)
}

export default Register
