import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import '../auth/style.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../context/shopcontext'
import {Input,Box, Heading,Text, Button, Center, HStack, VStack, IconButton, Icon} from '@chakra-ui/react'
import { FaUser, FaLock } from 'react-icons/fa';
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
  const closing=(response)=>{
    navigate('/Home')
    localStorage.setItem('userID',response.data.customerId)
          localStorage.setItem('userinfo',response.data.jwt)
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
          
          toast.success(response.data.message,{
            onClose:closing(response)
          })
          setIsauth(true)
          
        }
        else{
          toast.error(response.data)
        }
      })
      .catch(error=>{
         toast.error('Error !!!')
      })
      setUsername("")
      setPassword("")
  }
return (
  <Box  maxH={'50vh'} w={'100%'} mt={'10%'} >
  <Box boxShadow={'lg'} p={10} w={'30%'} mx={'auto'}>
      <Heading mb={10}>Login</Heading>
      <VStack gap={4}>
          <HStack w={'100%'}>
          <FaUser style={{marginRight:'10px'}}/>
          <Input type='text'  value={username} onChange={(event)=>setUsername(event.target.value)} />
          </HStack>
          <HStack w={'100%'}>
          <FaLock style={{marginRight:'10px'}}/>
          <Input type='password' value={password} onChange={(event)=>setPassword(event.target.value)} />
          </HStack>
        </VStack >
          <Button mt={4} mb={2} type='submit' colorScheme='blue' onClick={handlesubmit}>Submit</Button>
      <p>If you don't have a account</p>
      <Button mt={2} onClick={()=>navigate('/register')} colorScheme='red'>Register</Button>
      
  </Box>
  <ToastContainer/>
  </Box>
)
}
export default Login
